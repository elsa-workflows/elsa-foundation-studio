using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace Elsa.Studio.Web;

/// <summary>
/// Authentication and authorization wiring that gates the Studio management surface (module management,
/// feature management, console-stream). The gate is intentionally a thin API-key scheme validating
/// <c>Studio:BackendModuleManagementApiKey</c>; a host that wants a real identity scheme can register its
/// own authentication and reuse <see cref="PolicyName"/> as the seam without touching the endpoint mappings.
/// </summary>
internal static class ModuleManagementAuth
{
    /// <summary>The authorization policy applied to every management endpoint. This is the stable seam a host can rebind.</summary>
    public const string PolicyName = "ModuleManagementApi";

    /// <summary>The authentication scheme backing the built-in API-key gate.</summary>
    public const string SchemeName = "ModuleManagementApiKey";

    /// <summary>The request header carrying the management API key. Matches the header the Studio SPA already attaches.</summary>
    public const string ApiKeyHeaderName = "X-Elsa-Module-Management-Key";

    /// <summary>
    /// The query-string parameter carrying the management API key. Browsers cannot attach custom headers to
    /// WebSocket or EventSource requests, so the SignalR client sends its access token as <c>access_token</c>
    /// (the standard SignalR convention) — without this fallback the console-stream hub's WebSocket handshake
    /// is rejected and every connection degrades to long polling.
    /// </summary>
    public const string AccessTokenQueryParameterName = "access_token";

    private const string ApiKeyConfigurationKey = "Studio:BackendModuleManagementApiKey";
    private const string AllowAnonymousConfigurationKey = "Studio:AllowAnonymousManagementApi";

    public static IServiceCollection AddModuleManagementAuth(this IServiceCollection services, IConfiguration configuration)
    {
        var apiKey = configuration[ApiKeyConfigurationKey];
        var allowAnonymous = configuration.GetValue(AllowAnonymousConfigurationKey, defaultValue: false);

        services.AddAuthentication(SchemeName)
            .AddScheme<ModuleManagementApiKeyOptions, ModuleManagementApiKeyHandler>(SchemeName, options =>
            {
                options.ApiKey = apiKey;
                options.AllowAnonymous = allowAnonymous;
            });

        services.AddAuthorizationBuilder()
            .AddPolicy(PolicyName, policy =>
            {
                policy.AddAuthenticationSchemes(SchemeName);
                policy.RequireAuthenticatedUser();
            });

        return services;
    }
}

internal sealed class ModuleManagementApiKeyOptions : AuthenticationSchemeOptions
{
    /// <summary>The expected API key. When null/empty the gate falls back to <see cref="AllowAnonymous"/>.</summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Development opt-out. When true and no API key is configured, requests are authenticated anonymously so a
    /// fresh local checkout keeps working. Defaulted true only in <c>appsettings.Development.json</c>; it fails
    /// closed everywhere else.
    /// </summary>
    public bool AllowAnonymous { get; set; }
}

/// <summary>
/// Validates the management API key supplied via <see cref="ModuleManagementAuth.ApiKeyHeaderName"/>.
/// Fails closed: a missing/empty configured key rejects every request unless the development opt-out is set.
/// </summary>
internal sealed class ModuleManagementApiKeyHandler(
    IOptionsMonitor<ModuleManagementApiKeyOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder)
    : AuthenticationHandler<ModuleManagementApiKeyOptions>(options, logger, encoder)
{
    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var configuredKey = Options.ApiKey;

        if (string.IsNullOrWhiteSpace(configuredKey))
        {
            return Task.FromResult(Options.AllowAnonymous
                ? Success("anonymous")
                : AuthenticateResult.Fail("The Studio management API key is not configured."));
        }

        var providedKey = GetProvidedKey();
        if (providedKey is null)
            return Task.FromResult(AuthenticateResult.NoResult());

        if (!CryptographicEquals(providedKey, configuredKey))
            return Task.FromResult(AuthenticateResult.Fail("The supplied management API key is invalid."));

        return Task.FromResult(Success("module-management"));
    }

    private string? GetProvidedKey()
    {
        if (Request.Headers.TryGetValue(ModuleManagementAuth.ApiKeyHeaderName, out var headerKey))
            return headerKey.ToString();

        // The SignalR JavaScript client sends its access token as "Authorization: Bearer <token>" where it can
        // set headers (negotiate, long polling) and as the access_token query parameter where it cannot
        // (WebSockets, server-sent events).
        var authorization = Request.Headers.Authorization.ToString();
        const string bearerPrefix = "Bearer ";
        if (authorization.StartsWith(bearerPrefix, StringComparison.OrdinalIgnoreCase))
            return authorization[bearerPrefix.Length..];

        if (Request.Query.TryGetValue(ModuleManagementAuth.AccessTokenQueryParameterName, out var queryKey))
            return queryKey.ToString();

        return null;
    }

    private AuthenticateResult Success(string name)
    {
        var identity = new ClaimsIdentity(
            [new Claim(ClaimTypes.Name, name)],
            ModuleManagementAuth.SchemeName);
        var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
        return AuthenticateResult.Success(ticket);
    }

    private static bool CryptographicEquals(string provided, string expected)
    {
        var providedBytes = System.Text.Encoding.UTF8.GetBytes(provided);
        var expectedBytes = System.Text.Encoding.UTF8.GetBytes(expected);
        return System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(providedBytes, expectedBytes);
    }
}
