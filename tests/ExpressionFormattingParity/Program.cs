using System.Text.Json;
using System.Text.Json.Nodes;
using Elsa.Expressions;
using Elsa.Expressions.Core.Contracts;
using Elsa.Expressions.Core.Models;
using Elsa.Expressions.JavaScript;
using Elsa.Expressions.JavaScript.Core.Contracts;
using Elsa.Expressions.JavaScript.Jint;
using Elsa.Expressions.Liquid;
using Elsa.Primitives.Models;
using Microsoft.Extensions.DependencyInjection;

// Only authored synthetic test fixtures arrive on stdin, never customer/host expression data.
var fixtures = JsonSerializer.Deserialize<Fixture[]>(await Console.In.ReadToEndAsync(), new JsonSerializerOptions(JsonSerializerDefaults.Web))
    ?? throw new InvalidOperationException("Parity fixtures are required.");
if (fixtures.Length is 0 or > 100) throw new InvalidOperationException("Invalid parity fixture count.");
foreach (var fixture in fixtures)
{
    var before = await Evaluate(fixture, fixture.Before);
    var after = await Evaluate(fixture, fixture.After);
    AssertExpected(fixture, before);
    AssertExpected(fixture, after);
    if (before.HasValue != after.HasValue || !JsonNode.DeepEquals(before.Value, after.Value))
        throw new InvalidOperationException($"Runtime parity failed: {fixture.Id}");
}
Console.WriteLine($"Registered Jint/Fluid parity: {fixtures.Length} fixtures passed.");

static async Task<Outcome> Evaluate(Fixture fixture, string source)
{
    if (source.Length > 100_000) throw new InvalidOperationException("Fixture source exceeds the bound.");
    var services = new ServiceCollection();
    new ExpressionsFeature().ConfigureServices(services);
    new JavaScriptFeature().ConfigureServices(services);
    new JintFeature().ConfigureServices(services);
    new LiquidExpressionsFeature().ConfigureServices(services);
    await using var provider = services.BuildServiceProvider();
    await using var scope = provider.CreateAsyncScope();
    JsonElement? result;
    if (fixture.Language == "javascript" && fixture.Profile == "program")
    {
        var evaluator = scope.ServiceProvider.GetRequiredService<IJavaScriptScriptEvaluator>();
        result = await evaluator.EvaluateAsync(new JavaScriptScriptEvaluationRequest(source, fixture.Arguments, CancellationToken.None));
    }
    else
    {
        var values = fixture.Arguments.EnumerateObject().ToDictionary(item => item.Name, item => item.Value.Clone(), StringComparer.Ordinal);
        var bindings = values.ToDictionary(item => item.Key,
            item => (ExpressionParameterBinding)new LiteralExpressionParameterBinding(item.Value), StringComparer.Ordinal);
        var definition = new ExpressionDefinition(fixture.Language == "liquid" ? "Liquid" : "JavaScript", source,
            new TypeReference(fixture.Language == "liquid" ? "String" : "Any"), bindings,
            JsonSerializer.SerializeToElement(new { }), ExpressionCapabilityProfiles.BindingPureV1);
        result = await scope.ServiceProvider.GetRequiredService<IPortableExpressionEvaluator>()
            .EvaluateAsync(new ExpressionEvaluationRequest(definition, values, null, CancellationToken.None));
    }
    return new Outcome(result.HasValue, result.HasValue ? JsonNode.Parse(result.Value.GetRawText()) : null);
}

static void AssertExpected(Fixture fixture, Outcome outcome)
{
    if (outcome.HasValue == fixture.ExpectedUndefined ||
        (!fixture.ExpectedUndefined && !JsonNode.DeepEquals(outcome.Value, JsonNode.Parse(fixture.Expected.GetRawText()))))
        throw new InvalidOperationException($"Runtime golden failed: {fixture.Id}");
}

internal sealed record Fixture(string Id, string Language, string Profile, string Before, string After,
    JsonElement Arguments, JsonElement Expected, bool ExpectedUndefined = false);
internal sealed record Outcome(bool HasValue, JsonNode? Value);
