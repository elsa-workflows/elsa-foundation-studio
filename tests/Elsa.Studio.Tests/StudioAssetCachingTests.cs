using System.Net;
using Elsa.Studio.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Nuplane.Abstractions;
using Nuplane.Admin;
using Nuplane.Operational;
using Nuplane.Reconciliation;

namespace Elsa.Studio.Tests;

/// <summary>
/// Module entry points (<c>module.js</c>, <c>module*.css</c>) and the shell's bundles have stable, unhashed URLs while
/// the chunks they import are content-hashed and replaced on every build. If the browser reuses a cached entry point
/// without asking, it imports chunks that no longer exist — so every Studio asset must be revalidated before reuse.
/// </summary>
public sealed class StudioAssetCachingTests : IAsyncLifetime
{
    private const string PackageId = "Acme.Studio.Module";
    private const string ModuleEntry = "studio/modules/acme/module.js";
    private readonly string _root = Path.Combine(Path.GetTempPath(), $"elsa-asset-caching-{Guid.NewGuid():N}");
    private WebApplication _app = null!;
    private HttpClient _client = null!;

    private string WebRoot => Path.Combine(_root, "wwwroot");
    private string PackageInstallPath => Path.Combine(_root, "packages", PackageId);

    [Theory]
    [InlineData("/" + ModuleEntry)]
    [InlineData("/studio/index.html")]
    [InlineData("/workflows/definitions")] // SPA fallback to studio/index.html.
    public async Task HostStaticAssetsMustBeRevalidated(string path)
    {
        var response = await _client.GetAsync(path);

        response.EnsureSuccessStatusCode();
        Assert.True(response.Headers.CacheControl?.NoCache, $"Expected Cache-Control: no-cache on {path}.");
        Assert.NotNull(response.Content.Headers.LastModified);
    }

    [Fact]
    public async Task RevalidatingAnUnchangedAssetIsANotModified()
    {
        var first = await _client.GetAsync("/" + ModuleEntry);
        using var revalidation = new HttpRequestMessage(HttpMethod.Get, "/" + ModuleEntry);
        revalidation.Headers.IfModifiedSince = first.Content.Headers.LastModified;

        var second = await _client.SendAsync(revalidation);

        Assert.Equal(HttpStatusCode.NotModified, second.StatusCode);
    }

    [Fact]
    public async Task NuplanePackageAssetsMustBeRevalidated()
    {
        var response = await _client.GetAsync($"/_content/{PackageId}/{ModuleEntry}");

        response.EnsureSuccessStatusCode();
        Assert.True(response.Headers.CacheControl?.NoCache, "Expected Cache-Control: no-cache on a Nuplane package asset.");
    }

    public async Task InitializeAsync()
    {
        WriteFile(Path.Combine(WebRoot, ModuleEntry), "export const register = () => {};");
        WriteFile(Path.Combine(WebRoot, "studio", "index.html"), "<!doctype html>");
        WriteFile(Path.Combine(PackageInstallPath, "staticwebassets", ModuleEntry), "export const register = () => {};");

        var builder = WebApplication.CreateSlimBuilder(new WebApplicationOptions
        {
            EnvironmentName = Environments.Production,
            ContentRootPath = _root,
            WebRootPath = WebRoot
        });
        builder.WebHost.UseTestServer();
        builder.Services.AddSingleton<INuplaneAdminOperations>(new SinglePackageNuplaneAdmin(PackageId, PackageInstallPath));

        _app = builder.Build();
        _app.UseStudioStaticFiles();
        _app.MapNuplaneStaticWebAssets();
        _app.MapStudioFallback();

        await _app.StartAsync();
        _client = _app.GetTestClient();
    }

    public async Task DisposeAsync()
    {
        await _app.DisposeAsync();

        if (Directory.Exists(_root))
            Directory.Delete(_root, recursive: true);
    }

    private static void WriteFile(string path, string contents)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        File.WriteAllText(path, contents);
    }

    private sealed class SinglePackageNuplaneAdmin(string packageId, string installPath) : INuplaneAdminOperations
    {
        public Task<ActivePackagesSnapshot> GetPackagesAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult(new ActivePackagesSnapshot(DateTimeOffset.UtcNow, DateTimeOffset.UtcNow,
            [
                new ActivePackage(packageId, "1.0.0", "feed", "source", installPath, DateTimeOffset.UtcNow, "correlation",
                    "graph", "generation", ActivePackageRole.Root, [], [], true)
            ], "correlation"));

        public Task<OperationalStateSnapshot> GetStateAsync(CancellationToken cancellationToken = default) => throw new NotSupportedException();

        public Task<ManualReconcileOutcome> TriggerReconcileAsync(CancellationToken cancellationToken = default) => throw new NotSupportedException();
    }
}
