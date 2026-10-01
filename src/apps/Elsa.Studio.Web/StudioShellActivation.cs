using CShells;
using CShells.Lifecycle;

namespace Elsa.Studio.Web;

/// <summary>
/// Activates the default Studio shell before endpoint routing runs, so the endpoints a shell feature maps (theme
/// management, the optional Extension Builder bridge, …) are matched by routing — and therefore gated by the
/// authorization middleware — on the very first request as well as every later one.
///
/// <para>Without this, CShells activates a cold shell inside its own middleware, which runs <i>after</i> authorization,
/// and then re-matches the request against the freshly registered shell endpoints. Routing had matched the host's
/// <c>/_elsa/{**path}</c> fallback (which carries no policy), so authorization had already passed the request through:
/// the first request to a gated shell endpoint after a cold start would execute without its policy being evaluated.
/// Activating the shell first means routing sees the real endpoint and authorization enforces its policy.</para>
/// </summary>
internal static class StudioShellActivation
{
    public static IApplicationBuilder UseStudioDefaultShellActivation(this IApplicationBuilder app) =>
        app.Use(async (context, next) =>
        {
            var shells = context.RequestServices.GetRequiredService<IShellRegistry>();
            if (shells.GetActive(ShellConstants.DefaultShellName) is null)
            {
                try
                {
                    await shells.GetOrActivateAsync(ShellConstants.DefaultShellName, context.RequestAborted);
                }
                catch (Exception ex) when (ex is ShellBlueprintNotFoundException or ShellBlueprintUnavailableException)
                {
                    // No usable default shell blueprint: CShells' own middleware answers this case (404/503) downstream.
                }
            }

            await next(context);
        });
}
