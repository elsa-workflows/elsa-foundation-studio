using Elsa.Studio.Api.Options;
using Elsa.Studio.ExtensionBuilder;
using Elsa.Studio.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Elsa.Studio.Tests.ExtensionBuilder;

/// <summary>
/// The slim TestServer host the Extension Builder bridge tests run against: the host's bridge infrastructure
/// (<see cref="StudioBridgeAuth"/> gate + <see cref="StudioBackendManagementBridgeServiceCollectionExtensions"/>
/// options) plus the extension's own registration and endpoint mapping — exactly what the
/// <see cref="ExtensionBuilderStudioFeature"/> contributes, minus the CShells shell around it. Every Studio→backend
/// client (capabilities, relay, bearer introspection) is routed through the supplied <see cref="RecordingBackend"/> so
/// the tests assert real HTTP behaviour at the wire.
/// </summary>
internal static class ExtensionBuilderBridgeHost
{
    public const string BackendBaseUrl = "https://backend.example";
    public const string ManagementKey = "s3cr3t-management-key";

    public static async Task<WebApplication> StartAsync(
        RecordingBackend backend,
        string? backendBaseUrl = BackendBaseUrl,
        string? managementKey = ManagementKey,
        bool authEnabled = false,
        TimeProvider? timeProvider = null,
        string? pathBase = null)
    {
        var settings = new Dictionary<string, string?>
        {
            [StudioBackendManagementOptions.BackendBaseUrlConfigurationKey] = backendBaseUrl,
            [StudioBackendManagementOptions.ManagementApiKeyConfigurationKey] = managementKey,
            ["Studio:Auth:Enabled"] = authEnabled ? "true" : "false"
        };

        var builder = WebApplication.CreateSlimBuilder(new WebApplicationOptions { EnvironmentName = Environments.Production });
        builder.WebHost.UseTestServer();
        builder.Configuration.AddInMemoryCollection(settings);

        builder.Services.AddStudioBridgeAuth(builder.Configuration);
        builder.Services.AddStudioBackendManagementBridge(builder.Configuration);
        builder.Services.AddStudioExtensionBuilderBridge();
        if (timeProvider is not null)
            builder.Services.AddSingleton(timeProvider);

        builder.Services.RouteBackendClientsThrough(backend);

        var app = builder.Build();
        if (pathBase is not null)
            app.UsePathBase(pathBase);
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapStudioExtensionBuilderBridge();

        await app.StartAsync();
        return app;
    }

    /// <summary>
    /// Routes the extension's typed clients and the named bearer-introspection client through the recording backend
    /// stub so the tests assert real HTTP behaviour (methods, paths, headers, bodies, outbound-call counts) at the wire.
    /// </summary>
    public static IServiceCollection RouteBackendClientsThrough(this IServiceCollection services, RecordingBackend backend)
    {
        foreach (var clientName in new[] { nameof(StudioExtensionBuilderRelayClient), nameof(StudioExtensionBuilderCapabilitiesClient), StudioBridgeAuthHandler.HttpClientName })
            services.AddHttpClient(clientName).ConfigurePrimaryHttpMessageHandler(() => backend);

        return services;
    }
}
