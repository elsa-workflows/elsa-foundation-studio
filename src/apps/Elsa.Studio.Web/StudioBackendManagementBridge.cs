using System.Text.Json;
using Elsa.Studio.Api.Models;
using Elsa.Studio.Api.Options;
using Elsa.Studio.Api.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Elsa.Studio.Web;

/// <summary>
/// The Studio management bridge (ADR 0037): a Studio-owned server-side surface that reports the availability of the
/// backend Elsa host's management surface as an explicit Studio concept. The browser asks Studio for this status
/// instead of probing backend host-control endpoints directly, so the backend host management key never leaves the
/// server and the SPA never issues doomed, 401-noisy requests against the backend.
/// </summary>
internal static class StudioBackendManagementBridge
{
    public static IEndpointRouteBuilder MapStudioBackendManagementBridge(this IEndpointRouteBuilder endpoints)
    {
        // Host-control permission gating (#249, ADR 0037). Status + registry read the backend module/feature registry,
        // so they require `module-management.read`; the Extension Builder capabilities read requires
        // `extension-builder.read`. When Studio auth is disabled every policy allows anonymously (demo shell). A
        // signed-in user lacking the permission is forbidden (403) — distinct from an unauthenticated 401 and from the
        // backend-status states this bridge also reports.
        var group = endpoints.MapGroup(StudioBackendManagementRoutes.RouteGroup);

        group.MapGet("/status", GetStatusAsync)
            .RequireAuthorization(StudioBridgeAuth.ModuleManagementReadPolicyName);
        group.MapGet("/registry", GetRegistryAsync)
            .RequireAuthorization(StudioBridgeAuth.ModuleManagementReadPolicyName);
        group.MapGet("/extension-builder/capabilities", GetExtensionBuilderCapabilitiesAsync)
            .RequireAuthorization(StudioBridgeAuth.ExtensionBuilderReadPolicyName);

        // The Extension Builder operation relays (#256) live in their own table-driven group under this one.
        endpoints.MapStudioExtensionBuilderBridge();

        return endpoints;
    }

    private static async Task<IResult> GetStatusAsync(
        StudioBackendManagementClient client,
        CancellationToken cancellationToken)
    {
        var status = await client.GetManagementStatusAsync(cancellationToken);
        return Results.Ok(status);
    }

    // The Studio-owned backend host-registry read (#246, ADR 0037). The browser calls this with only its normal
    // credentials; Studio attaches the server-side management key on the Studio->backend call. The result is a
    // status-bearing envelope so the SPA branches on an explicit backend-management state (available / unconfigured /
    // unreachable / unauthorized / degraded) instead of inferring it from an opaque HTTP failure.
    private static async Task<IResult> GetRegistryAsync(
        StudioBackendManagementClient client,
        CancellationToken cancellationToken)
    {
        var envelope = await client.GetRegistryAsync(cancellationToken);
        return Results.Ok(envelope);
    }

    private static async Task<IResult> GetExtensionBuilderCapabilitiesAsync(
        StudioBackendManagementClient client,
        CancellationToken cancellationToken)
    {
        var capabilities = await client.GetExtensionBuilderCapabilitiesAsync(cancellationToken);
        return Results.Ok(capabilities);
    }
}

/// <summary>
/// The backend host registry as surfaced by the Studio management bridge (#246, ADR 0037). This is the Studio-owned
/// browser-facing shape: it wraps the raw backend registry payload (<see cref="Registry"/>, present only when
/// <see cref="Status"/> is <c>available</c>) in the same explicit backend-management <see cref="Status"/> the bridge
/// reports for the status endpoint, so the frontend renders the real unconfigured / unreachable / unauthorized /
/// degraded state instead of inferring it from a failed fetch. On any non-available status the bridge issues zero (when
/// unconfigured) or fail-closed outbound calls and returns a <c>null</c> registry. The management key is never echoed.
/// </summary>
internal sealed record StudioBackendManagementRegistryEnvelope(
    string Status,
    string Detail,
    string? BackendBaseUrl,
    DateTimeOffset CheckedAt,
    JsonElement? Registry)
{
    public static StudioBackendManagementRegistryEnvelope FromStatus(StudioBackendManagementStatus status, JsonElement? registry = null) =>
        new(status.Status, status.Detail, status.BackendBaseUrl, status.CheckedAt, registry);
}

/// <summary>
/// Backend Extension Builder capabilities as seen by Studio (ADR 0037): a Studio concept ("host capabilities") the
/// browser reads from the Studio origin instead of probing the backend host-control endpoint directly. The
/// <see cref="Status"/> field carries the same explicit envelope as <see cref="StudioBackendManagementStatus"/> so the
/// frontend branches on state, not on an HTTP failure. <see cref="Capabilities"/> is populated only when
/// <see cref="Status"/> is <c>available</c>; for every other state the frontend renders an explicit
/// "backend management unavailable" surface and gates actions rather than issuing doomed backend requests.
/// </summary>
internal sealed record StudioExtensionBuilderCapabilitiesResult(
    string Status,
    string Detail,
    StudioExtensionBuilderCapabilities? Capabilities,
    string? BackendBaseUrl,
    DateTimeOffset CheckedAt)
{
    // Same envelope vocabulary as StudioBackendManagementStatus, re-declared here so the capabilities DTO is a
    // self-contained Studio concept rather than reaching into the status DTO's constants.
    public const string Available = StudioBackendManagementStatus.Available;
    public const string Unconfigured = StudioBackendManagementStatus.Unconfigured;
    public const string Unauthorized = StudioBackendManagementStatus.Unauthorized;
    public const string Unreachable = StudioBackendManagementStatus.Unreachable;
    public const string Degraded = StudioBackendManagementStatus.Degraded;
}

/// <summary>
/// The Studio-owned view of the backend Extension Builder capability flags. Mirrors the backend's capability contract
/// but is a Studio DTO: the frontend derives which Extension Builder actions to enable from these flags. Server
/// enforcement on the backend remains authoritative regardless of what the browser is shown.
/// </summary>
internal sealed record StudioExtensionBuilderCapabilities(
    bool CanCreateWorkspace,
    bool CanEditFiles,
    bool CanBuild,
    bool CanPromote,
    bool CanRollback);

/// <summary>
/// Studio's first server-to-server HTTP client to the backend Elsa host. It attaches the backend host management key
/// (<see cref="StudioBackendManagementOptions.ManagementApiKeyHeaderName"/>) only on these Studio→backend calls; the browser never sees it.
/// The client fails closed: when no backend base URL or management key is configured it returns <c>unconfigured</c>
/// without issuing any outbound request.
/// </summary>
internal sealed class StudioBackendManagementClient(
    HttpClient httpClient,
    StudioBackendManagementOptions options,
    ILogger<StudioBackendManagementClient> logger) : StudioBackendReadClient(httpClient, options, logger)
{
    // The backend read-only host-control endpoints the bridge probes. These paths are Studio→backend implementation
    // details; they are never surfaced to the browser.
    private const string BackendRegistryPath = "/_elsa/module-management/registry";
    private const string BackendExtensionBuilderCapabilitiesPath = "/_elsa/extension-builder/capabilities";

    private static readonly JsonSerializerOptions BackendJsonOptions = new(JsonSerializerDefaults.Web);

    // The two backend surfaces the bridge reads. Each carries its path plus the surface-specific detail strings, so
    // every read shares ONE probe/mapping pipeline (fail-closed gate, key attachment, status mapping) while keeping the
    // operator-facing wording each surface shipped with.
    private static readonly StudioBackendReadSurface ManagementRegistrySurface = new(
        Path: BackendRegistryPath,
        Description: "privileged host-management surface",
        UnconfiguredDetail: "Privileged host management is not configured on the Studio host. Set Studio:BackendServerBaseUrl (or Studio:BackendBaseUrl for a shared URL) and Studio:BackendModuleManagementApiKey to enable Server module management.",
        AvailableDetail: "The privileged host-management surface is reachable.",
        UnauthorizedDetail: "The backend rejected the Studio management key (or its privileged host-management surface is disabled). Verify Studio:BackendModuleManagementApiKey matches the backend host management key.",
        UnreachableDetail: "The privileged host-management surface could not be reached. Check that the backend host is running and Studio:BackendServerBaseUrl (or Studio:BackendBaseUrl) is correct.",
        UnrecognizedPayloadDetail: "The backend responded but did not return a recognizable management registry.");

    private static readonly StudioBackendReadSurface ExtensionBuilderCapabilitiesSurface = new(
        Path: BackendExtensionBuilderCapabilitiesPath,
        Description: "backend Extension Builder capabilities surface",
        UnconfiguredDetail: "Privileged host management is not configured on the Studio host. Set Studio:BackendServerBaseUrl (or Studio:BackendBaseUrl for a shared URL) and Studio:BackendModuleManagementApiKey to enable Extension Builder.",
        AvailableDetail: "The backend Extension Builder capabilities are reachable.",
        UnauthorizedDetail: "The backend rejected the Studio management key (or the Extension Builder surface is disabled). Verify Studio:BackendModuleManagementApiKey matches the backend host management key.",
        UnreachableDetail: "The backend Extension Builder capabilities surface could not be reached. Check that the backend host is running and Studio:BackendServerBaseUrl (or Studio:BackendBaseUrl) is correct.",
        UnrecognizedPayloadDetail: "The backend responded but did not return recognizable Extension Builder capabilities.");

    public async Task<StudioBackendManagementStatus> GetManagementStatusAsync(CancellationToken cancellationToken)
    {
        // The status probe only needs the status half of the mapped response; it discards the parsed registry payload.
        var (status, _) = await ProbeBackendAsync(ManagementRegistrySurface, cancellationToken);
        return status;
    }

    // The Studio-owned registry read (#246): the same fail-closed / send / map pipeline as the status probe, but it
    // returns the parsed backend registry payload alongside the status so the browser gets the host registry without
    // ever calling backend host-control endpoints or seeing the management key.
    public async Task<StudioBackendManagementRegistryEnvelope> GetRegistryAsync(CancellationToken cancellationToken)
    {
        var (status, registry) = await ProbeBackendAsync(ManagementRegistrySurface, cancellationToken);
        return StudioBackendManagementRegistryEnvelope.FromStatus(status, registry);
    }

    // The Studio-owned Extension Builder capabilities read (#247): the shared probe against the capabilities surface,
    // with the JSON payload projected into the Studio capability flags.
    public async Task<StudioExtensionBuilderCapabilitiesResult> GetExtensionBuilderCapabilitiesAsync(CancellationToken cancellationToken)
    {
        var (status, payload) = await ProbeBackendAsync(ExtensionBuilderCapabilitiesSurface, cancellationToken);
        var capabilities = TryDeserializeCapabilities(payload);

        // A JSON-object 200 whose members don't bind to the capability flags is degraded, not available — the same
        // "unrecognizable payload" mapping the probe applies to non-object bodies.
        if (status.Status == StudioBackendManagementStatus.Available && capabilities is null)
        {
            return new(
                StudioExtensionBuilderCapabilitiesResult.Degraded,
                ExtensionBuilderCapabilitiesSurface.UnrecognizedPayloadDetail,
                Capabilities: null,
                status.BackendBaseUrl,
                status.CheckedAt);
        }

        return new(status.Status, status.Detail, capabilities, status.BackendBaseUrl, status.CheckedAt);
    }

    private static StudioExtensionBuilderCapabilities? TryDeserializeCapabilities(JsonElement? payload)
    {
        if (payload is null)
            return null;

        try
        {
            return payload.Value.Deserialize<StudioExtensionBuilderCapabilities>(BackendJsonOptions);
        }
        catch (JsonException)
        {
            return null;
        }
    }
}

internal static class StudioBackendManagementBridgeServiceCollectionExtensions
{
    // Short, so the browser-facing bridge status endpoint stays snappy even when the backend is slow to answer.
    private static readonly TimeSpan BackendRequestTimeout = TimeSpan.FromSeconds(5);

    /// <summary>
    /// Registers the typed <see cref="StudioBackendManagementClient"/> and <see cref="StudioExtensionBuilderRelayClient"/>
    /// over <see cref="IHttpClientFactory"/>. When no backend base URL is configured, no <c>BaseAddress</c> is set —
    /// the clients still resolve and fail closed to <c>unconfigured</c> without issuing any request.
    /// </summary>
    public static IServiceCollection AddStudioBackendManagementBridge(this IServiceCollection services, IConfiguration configuration)
    {
        var options = StudioBackendManagementOptions.FromConfiguration(configuration);
        services.AddSingleton(options);
        services.TryAddSingleton(TimeProvider.System);

        services.AddHttpClient<StudioBackendManagementClient>(client =>
            options.ConfigureBackendClient(client, BackendRequestTimeout));

        // The relay enforces per-operation budgets with a linked CancellationTokenSource; the client-level timeout must
        // neither race those budgets nor cap a long Text/Stream body copy, so it is disabled here.
        services.AddHttpClient<StudioExtensionBuilderRelayClient>(client =>
            options.ConfigureBackendClient(client, Timeout.InfiniteTimeSpan));

        return services;
    }
}
