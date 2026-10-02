using System.Reflection;
using System.Text.Json.Nodes;
using CShells.DependencyInjection;
using CShells.Features;
using Elsa.Studio.Web;
using Microsoft.Extensions.DependencyInjection;
using Nuplane.Loading;

namespace Elsa.Studio.Tests;

public sealed class WebHostShellFeatureDiscoveryTests
{
    // Features the Web host enables in shells.json but deliberately does not reference: their assemblies arrive through
    // an installed Nuplane package, so they only become discoverable once that package is dropped into the feed.
    private static readonly string[] PackageLoadedFeatures = ["WeatherForecastSample"];

    [Fact]
    public async Task EveryFeatureEnabledInShellsJson_ResolvesToDiscoverableFeatureType()
    {
        var discovered = await DiscoverFeatureIdsAsync();

        var undiscoverable = ReadEnabledFeatures()
            .Except(PackageLoadedFeatures, StringComparer.OrdinalIgnoreCase)
            .Where(feature => !discovered.Contains(feature));

        Assert.Empty(undiscoverable);
    }

    // Uses the host's own assembly registration, with no Nuplane packages installed, so the result matches a fresh start.
    private static async Task<HashSet<string>> DiscoverFeatureIdsAsync()
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddSingleton<IPackageAssemblyCatalog, EmptyPackageAssemblyCatalog>();
        services.AddSingleton<StudioNuplaneAssemblyProvider>();
        services.AddCShells(shells => shells.WithStudioFeatureAssemblies());
        await using var provider = services.BuildServiceProvider();

        var snapshot = await provider.GetRequiredService<IRuntimeFeatureCatalog>().GetSnapshotAsync();
        return snapshot.FeatureDescriptors.Select(descriptor => descriptor.Id).ToHashSet(StringComparer.OrdinalIgnoreCase);
    }

    // Mirrors StudioShellFeatureConfigurationStore: an entry is enabled unless its value is literally false.
    private static IEnumerable<string> ReadEnabledFeatures()
    {
        var shellsPath = Path.Combine(AppContext.BaseDirectory, "WebHost", "shells.json");
        var features = JsonNode.Parse(File.ReadAllText(shellsPath))!["CShells"]!["Shells"]!["Default"]!["Features"]!.AsObject();

        return features
            .Where(feature => feature.Value is not JsonValue value || !value.TryGetValue<bool>(out var enabled) || enabled)
            .Select(feature => feature.Key);
    }

    private sealed class EmptyPackageAssemblyCatalog : IPackageAssemblyCatalog
    {
        public Task<IReadOnlyList<Assembly>> GetAssembliesAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult<IReadOnlyList<Assembly>>([]);

        public Task<IReadOnlyList<PackageAssemblies>> GetPackagedAssembliesAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult<IReadOnlyList<PackageAssemblies>>([]);

        public Task<PackageAssemblies?> GetPackagedAssembliesAsync(string packageId, CancellationToken cancellationToken = default) =>
            Task.FromResult<PackageAssemblies?>(null);
    }
}
