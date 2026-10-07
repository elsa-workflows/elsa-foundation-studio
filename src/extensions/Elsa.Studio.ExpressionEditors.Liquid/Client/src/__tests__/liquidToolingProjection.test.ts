import { describe, expect, it, vi } from "vitest";
import { createLiquidToolingProjection } from "../liquidToolingProjection";

const document = {
  id: "doc",
  uri: "elsa://draft/activity/property/Liquid",
  draftId: "draft",
  activityId: "activity",
  propertyKey: "property",
  expressionType: "Liquid",
  source: "",
  sourceVersion: 1
};

const authoringContext = {
  version: "context-1",
  capabilities: { completion: true, hover: true, signatures: true },
  target: { id: "target", name: "Text", kind: "value" },
  rootSymbols: [
    { id: "customer", name: "customer", kind: "value", shapeId: "customer-shape" },
    { id: "caller-filter", name: "render", kind: "filter", documentation: "context filter must not be treated as a Liquid catalog item" }
  ],
  workflowInputs: [],
  visibleVariables: [],
  visibleActivityOutputs: []
};

const catalogSymbols = [
  { id: "filter-safe", name: "safeFilter", kind: "filter", documentation: "Safe text.", signatures: [{ label: "safeFilter(value)", parameters: [{ name: "value" }] }] },
  { id: "tag-custom", name: "customTag", kind: "tag", documentation: "Custom tag.", signatures: [{ label: "customTag(scope)", parameters: [{ name: "scope" }], returnShapeId: "tag-result" }] },
  { id: "value-budget", name: "budget", kind: "value" }
];

const activityOutput = {
  id: "activity-result:predecessor.Line",
  name: "predecessor.Line",
  kind: "value",
  documentation: "Activity output",
  shapeId: "line-shape"
};

const activityOutputContext = {
  ...authoringContext,
  rootSymbols: [...authoringContext.rootSymbols, activityOutput],
  visibleActivityOutputs: [activityOutput]
};

function setup(getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: catalogSymbols } })) {
  return createLiquidToolingProjection({
    document,
    authoringContext,
    tooling: {
      getCatalog,
      getValueShape: vi.fn().mockResolvedValue({
        state: "ready",
        data: { id: "customer-shape", members: [{ name: "email", documentation: "Email address.", shapeId: "email-shape" }] }
      }),
      getCompletions: vi.fn(async () => ({ state: "ready", data: { items: [{ label: "ambientStatic" }] } })),
      getHover: vi.fn(async () => ({ state: "ready", data: { contents: "ambient static hover" } }))
    }
  });
}

describe("Liquid tooling projection", () => {
  it("projects authorized context values and catalog-only filters/tags by parser position", async () => {
    const projection = setup();
    const filterSource = "{{ customer | safeTail }}";
    const filterPosition = filterSource.indexOf("safeTail") + 4;
    const filters = await projection.completionProvider({
      document: { ...document, value: filterSource }, position: filterPosition, explicit: true, signal: new AbortController().signal
    });
    expect(filters?.map(item => item.label)).toContain("safeFilter");
    expect(filters?.map(item => item.label)).not.toContain("standardStaticFilter");
    expect(filters?.map(item => item.label)).not.toContain("date");
    expect(filters?.find(item => item.label === "safeFilter")?.range).toEqual({
      from: filterSource.indexOf("safeTail"),
      to: filterSource.indexOf("safeTail") + "safeTail".length
    });

    const tagSource = "{%- customTail -%}";
    const tagPosition = tagSource.indexOf("customTail") + 6;
    const tags = await projection.completionProvider({
      document: { ...document, value: tagSource }, position: tagPosition, explicit: true, signal: new AbortController().signal
    });
    expect(tags?.map(item => item.label)).toContain("customTag");
    expect(tags?.map(item => item.label)).not.toContain("safeFilter");
    expect(tags?.map(item => item.label)).not.toContain("include");
    expect(tags?.find(item => item.label === "customTag")?.range).toEqual({
      from: tagSource.indexOf("customTail"),
      to: tagSource.indexOf("customTail") + "customTail".length
    });

    const valueSource = "{{ customer. ";
    const values = await projection.completionProvider({
      document: { ...document, value: valueSource }, position: valueSource.length, explicit: false, signal: new AbortController().signal
    });
    expect(values?.map(item => item.label)).toContain("email");
    expect(values?.map(item => item.label)).not.toContain("budget");
    expect(values?.map(item => item.label)).not.toContain("safeFilter");
  });

  it("projects flattened authorized activity outputs through a Liquid member path", async () => {
    const context = {
      ...activityOutputContext,
      rootSymbols: [...activityOutputContext.rootSymbols, {
        id: "filter:predecessor.unsafe",
        name: "predecessor.unsafe",
        kind: "filter",
        shapeId: "filter-shape"
      }]
    };
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [] } });
    const projection = createLiquidToolingProjection({
      document,
      authoringContext: context,
      tooling: { getCatalog, getValueShape: vi.fn().mockResolvedValue({ state: "ready", data: { id: "line-shape", members: [] } }) }
    });
    const source = "{{ predecessor.";
    const signal = new AbortController().signal;
    const completions = await projection.completionProvider({
      document: { ...document, value: source }, position: source.length, explicit: true, signal
    });

    expect(completions).toContainEqual(expect.objectContaining({
      label: "Line",
      range: { from: source.length, to: source.length }
    }));
    expect(completions?.filter(item => item.label === "Line")).toHaveLength(1);
    expect(completions?.map(item => item.label)).not.toContain("unsafe");
    expect(getCatalog).toHaveBeenCalledWith(
      expect.objectContaining({ source, sourceVersion: 2 }), context, "predecessor", undefined, signal
    );

    const memberSource = "{{ predecessor.Line }}";
    const memberFrom = memberSource.indexOf("Line");
    await expect(projection.hoverProvider(
      { ...document, value: memberSource }, memberFrom + 2, signal
    )).resolves.toMatchObject({
      range: { from: memberFrom, to: memberFrom + "Line".length },
      documentation: { markdown: "Line\n\nActivity output" }
    });

    const unauthorizedProjection = createLiquidToolingProjection({
      document,
      authoringContext: context,
      tooling: { getCatalog: vi.fn().mockResolvedValue({ state: "unauthorized" }) }
    });
    await expect(unauthorizedProjection.completionProvider({
      document: { ...document, value: source }, position: source.length, explicit: true, signal
    })).resolves.toEqual([]);
  });

  it("projects flat catalog-only values while keeping same-name filters out of value roots", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [
      activityOutput,
      { id: "filter:append", name: "append", kind: "filter", documentation: "Append text." }
    ] } });
    const context = {
      ...authoringContext,
      rootSymbols: [...authoringContext.rootSymbols,
        { id: "filter:append", name: "append", kind: "filter", documentation: "Context filter." }],
      visibleVariables: [{ id: "variable:append", name: "append", kind: "value", documentation: "Variable append." }]
    };
    const projection = createLiquidToolingProjection({ document, authoringContext: context, tooling: { getCatalog } });
    const signal = new AbortController().signal;

    const memberSource = "{{ predecessor.";
    await expect(projection.completionProvider({
      document: { ...document, value: memberSource }, position: memberSource.length, explicit: true, signal
    })).resolves.toContainEqual(expect.objectContaining({ label: "Line", documentation: { markdown: "Activity output" } }));

    const valueSource = "{{ app }}";
    const values = await projection.completionProvider({
      document: { ...document, value: valueSource }, position: valueSource.indexOf("app") + 3, explicit: true, signal
    });
    expect(values?.filter(item => item.label === "append")).toEqual([
      expect.objectContaining({ label: "append", documentation: { markdown: "Variable append." } })
    ]);

    const filterSource = "{{ customer | app }}";
    await expect(projection.completionProvider({
      document: { ...document, value: filterSource }, position: filterSource.indexOf("app") + 3, explicit: true, signal
    })).resolves.toEqual([expect.objectContaining({ label: "append", kind: "filter" })]);
  });

  it("merges flat context children with runtime shape facts without losing runtime metadata", async () => {
    const output = {
      ...activityOutput,
      shapeId: "context-line-shape",
      signatures: [{ label: "Line()" }]
    };
    const context = {
      ...authoringContext,
      rootSymbols: [...authoringContext.rootSymbols,
        { id: "activity-output-root", name: "predecessor", kind: "value", shapeId: "predecessor-shape" }, output],
      visibleActivityOutputs: [output]
    };
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [] } });
    const getValueShape = vi.fn(async (_document: unknown, _context: unknown, shapeId: string) => ({
      state: "ready" as const,
      data: shapeId === "predecessor-shape"
        ? { id: shapeId, members: [{ name: "Line", shapeId: "runtime-line-shape" }] }
        : { id: shapeId, members: [{ name: "value", shapeId: "scalar-shape" }] }
    }));
    const projection = createLiquidToolingProjection({ document, authoringContext: context, tooling: { getCatalog, getValueShape } });
    const signal = new AbortController().signal;
    const source = "{{ predecessor.";
    const completions = await projection.completionProvider({
      document: { ...document, value: source }, position: source.length, explicit: true, signal
    });
    expect(completions?.filter(item => item.label === "Line")).toEqual([
      expect.objectContaining({ label: "Line", detail: "Line()", documentation: { markdown: "Activity output" } })
    ]);

    const nestedSource = "{{ predecessor.Line.";
    await expect(projection.completionProvider({
      document: { ...document, value: nestedSource }, position: nestedSource.length, explicit: true, signal
    })).resolves.toContainEqual(expect.objectContaining({ label: "value" }));
    expect(getValueShape.mock.calls.map(([, , shapeId]) => shapeId)).toEqual([
      "predecessor-shape", "predecessor-shape", "runtime-line-shape"
    ]);
  });

  it.each(["unavailable", "unauthorized", "incompatible", "stale", "canceled"] as const)(
    "keeps flattened children quiet when their declared parent shape is %s",
    async state => {
      const context = {
        ...activityOutputContext,
        rootSymbols: [...activityOutputContext.rootSymbols,
          { id: "activity-output-root", name: "predecessor", kind: "value", shapeId: "predecessor-shape" }]
      };
      const getValueShape = vi.fn().mockResolvedValue({ state } as never);
      const getCompletions = vi.fn();
      const getHover = vi.fn();
      const projection = createLiquidToolingProjection({
        document,
        authoringContext: context,
        tooling: {
          getCatalog: vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [] } }),
          getValueShape,
          getCompletions,
          getHover
        }
      });
      const source = "{{ predecessor.";
      const signal = new AbortController().signal;
      await expect(projection.completionProvider({
        document: { ...document, value: source }, position: source.length, explicit: true, signal
      })).resolves.toEqual([]);
      const hoverSource = "{{ predecessor.Line }}";
      await expect(projection.hoverProvider(
        { ...document, value: hoverSource }, hoverSource.indexOf("Line") + 2, signal
      )).resolves.toBeNull();
      expect(getValueShape).toHaveBeenCalledTimes(2);
      expect(getCompletions).not.toHaveBeenCalled();
      expect(getHover).not.toHaveBeenCalled();
    }
  );

  it("normalizes dotted shape members only within the four-segment Liquid lookup bound", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [] } });
    const getValueShape = vi.fn().mockResolvedValue({
      state: "ready",
      data: { id: "customer-shape", members: [{ name: "address.city.name", documentation: "Nested member.", shapeId: "name-shape" }] }
    });
    const projection = createLiquidToolingProjection({ document, authoringContext, tooling: { getCatalog, getValueShape } });
    const allowedSource = "{{ customer.address.city.";
    await expect(projection.completionProvider({
      document: { ...document, value: allowedSource }, position: allowedSource.length, explicit: true, signal: new AbortController().signal
    })).resolves.toContainEqual(expect.objectContaining({ label: "name" }));

    const overLimitSource = "{{ customer.address.city.name.";
    await expect(projection.completionProvider({
      document: { ...document, value: overLimitSource }, position: overLimitSource.length, explicit: true, signal: new AbortController().signal
    })).resolves.toEqual([]);
    expect(getCatalog).toHaveBeenCalledTimes(1);
  });

  it("uses rich catalog documentation, exact ranges and signature metadata for filter and tag help", async () => {
    const projection = setup();
    const source = "{{ value | safeFilter }}";
    const position = source.indexOf("safeFilter") + 3;
    const filterHover = await projection.hoverProvider({ ...document, value: source }, position, new AbortController().signal);
    expect(filterHover).toMatchObject({
      range: { from: source.indexOf("safeFilter"), to: source.indexOf("safeFilter") + "safeFilter".length },
      documentation: { markdown: "Safe text." }
    });
    await expect(projection.signatureProvider({ ...document, value: source }, position, new AbortController().signal))
      .resolves.toMatchObject({ label: "safeFilter(value)", parameters: [{ name: "value" }] });

    const tagSource = "{% customTag %}";
    const tagPosition = tagSource.indexOf("customTag") + 4;
    const tagHover = await projection.hoverProvider({ ...document, value: tagSource }, tagPosition, new AbortController().signal);
    expect(tagHover).toMatchObject({
      range: { from: tagSource.indexOf("customTag"), to: tagSource.indexOf("customTag") + "customTag".length },
      documentation: { markdown: "Custom tag." }
    });
    await expect(projection.signatureProvider({ ...document, value: tagSource }, tagPosition, new AbortController().signal))
      .resolves.toMatchObject({
        label: "customTag(scope)",
        parameters: [{ name: "scope" }],
        returnShapeId: "tag-result"
      });

    const memberSource = "{{ customer.email }}";
    const memberPosition = memberSource.indexOf("email") + 2;
    await expect(projection.hoverProvider({ ...document, value: memberSource }, memberPosition, new AbortController().signal))
      .resolves.toMatchObject({
        range: { from: memberSource.indexOf("email"), to: memberSource.indexOf("email") + "email".length },
        documentation: { markdown: "email\n\nEmail address." }
    });
  });

  it("projects authorized filter overloads from explicit arguments, including quiet strings", async () => {
    const signatures = [
      { label: "append(first, second)", parameters: [{ name: "first" }, { name: "second" }] },
      { label: "append(first)", parameters: [{ name: "first" }] }
    ];
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [
      { id: "filter-append", name: "append", kind: "filter", signatures }
    ] } });
    const projection = setup(getCatalog);
    const source = '{{ price | append: "left,right", other }}';
    const firstArgument = source.indexOf("right") + 2;
    const secondArgument = source.indexOf("other") + 2;

    await expect(projection.signatureProvider({ ...document, value: source }, firstArgument, new AbortController().signal))
      .resolves.toMatchObject({
        label: "append(first, second)",
        signatures: [
          { label: "append(first, second)", activeParameter: 0 },
          { label: "append(first)", activeParameter: 0 }
        ],
        activeParameter: 0,
        activeSignature: 0,
        callableId: "filter-append"
      });

    await expect(projection.signatureProvider({ ...document, value: source }, secondArgument, new AbortController().signal))
      .resolves.toMatchObject({
        signatures: [
          { label: "append(first, second)", activeParameter: 1 },
          { label: "append(first)" }
        ],
        activeParameter: 1
      });
  });

  it("shows actual tag signatures without guessing custom tag argument ordinals", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [
      { id: "tag-custom", name: "customTag", kind: "tag", signatures: [
        { label: "customTag(first, second)", parameters: [{ name: "first" }, { name: "second" }] }
      ] }
    ] } });
    const projection = setup(getCatalog);
    const source = "{% customTag first, second %}";
    const position = source.indexOf("first") + 2;

    await expect(projection.signatureProvider({ ...document, value: source }, position, new AbortController().signal))
      .resolves.toMatchObject({
        label: "customTag(first, second)",
        signatures: [{ label: "customTag(first, second)" }],
        activeSignature: 0,
        callableId: "tag-custom"
      });
    const result = await projection.signatureProvider({ ...document, value: source }, position, new AbortController().signal);
    expect(result?.activeParameter).toBeUndefined();
    expect(result?.signatures?.[0]?.activeParameter).toBeUndefined();
  });

  it("hides an explicitly empty authorized Liquid signature array", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: [
      { id: "filter-safe", name: "safeFilter", kind: "filter", signatures: [] }
    ] } });
    const projection = setup(getCatalog);
    const source = "{{ value | safeFilter: argument }}";

    await expect(projection.signatureProvider(
      { ...document, value: source },
      source.indexOf("argument") + 2,
      new AbortController().signal
    )).resolves.toBeNull();
  });

  it("keeps strings and raw/comment bodies quiet", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "unauthorized" });
    const projection = setup(getCatalog);
    const source = [
      '{{ "customer | safeFilter" }}',
      "{% raw %}{{ customer | safeFilter }}{% endraw %}",
      "{% comment %}{{ customer | safeFilter }}{% endcomment %}"
    ].join("\n");

    const quietPositions = [
      source.indexOf("customer"),
      source.indexOf("customer", source.indexOf("{% raw %}")),
      source.indexOf("safeFilter", source.indexOf("{% raw %}")),
      source.indexOf("customer", source.indexOf("{% comment %}")),
      source.indexOf("safeFilter", source.indexOf("{% comment %}"))
    ].map(position => position + 2);
    for (const position of quietPositions) {
      const completions = await projection.completionProvider({
        document: { ...document, value: source }, position, explicit: true, signal: new AbortController().signal
      });
      expect(completions).toEqual([]);
      expect(await projection.hoverProvider({ ...document, value: source }, position, new AbortController().signal)).toBeNull();
      expect(await projection.signatureProvider({ ...document, value: source }, position, new AbortController().signal)).toBeNull();
    }
    expect(getCatalog).not.toHaveBeenCalled();
  });

  it("keeps over-deep member chains quiet without requesting root symbols", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: catalogSymbols } });
    const projection = setup(getCatalog);
    const source = `{{ customer.${Array.from({ length: 7 }, (_, index) => `level${index}`).join(".")}. }}`;
    expect(await projection.completionProvider({
      document: { ...document, value: source }, position: source.indexOf("}", source.indexOf("customer")), explicit: true, signal: new AbortController().signal
    })).toEqual([]);
    expect(getCatalog).not.toHaveBeenCalled();
  });

  it("fails closed on unavailable member shapes and avoids stale source-version mutations after delayed cancellation", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "ready", data: { symbols: catalogSymbols } });
    const shapeResponse: { state: "ready"; data: { id: string; members: { name: string; shapeId: string }[] } } = {
      state: "ready",
      data: { id: "customer-shape", members: [{ name: "address", shapeId: "address-shape" }] }
    };
    let resolveShape!: (value: typeof shapeResponse) => void;
    let signalObserved: AbortSignal | undefined;
    let shapeRequested!: () => void;
    const requestedShape = new Promise<void>(resolve => shapeRequested = resolve);
    const getValueShape = vi.fn((_document: unknown, _context: unknown, _shapeId: string, signal: AbortSignal) => {
      signalObserved = signal;
      shapeRequested();
      return new Promise<typeof shapeResponse>(resolve => resolveShape = resolve);
    });
    const projection = createLiquidToolingProjection({ document, authoringContext, tooling: { getCatalog, getValueShape } });
    const cancelled = new AbortController();
    const deepMemberSource = "{{ customer.address.city }}";
    const pending = projection.completionProvider({
      document: { ...document, value: deepMemberSource }, position: deepMemberSource.indexOf("city") + 2, explicit: true, signal: cancelled.signal
    });
    await requestedShape;
    expect(signalObserved).toBe(cancelled.signal);

    const latestSource = "{{ budget }}";
    await projection.completionProvider({
      document: { ...document, value: latestSource }, position: latestSource.indexOf("budget") + 3, explicit: true, signal: new AbortController().signal
    });
    cancelled.abort();
    resolveShape(shapeResponse);
    await expect(pending).resolves.toEqual([]);
    await projection.completionProvider({
      document: { ...document, value: latestSource }, position: latestSource.indexOf("budget") + 3, explicit: true, signal: new AbortController().signal
    });
    expect(getCatalog.mock.calls.map(([requestDocument]) => requestDocument.sourceVersion)).toEqual([2, 3, 3]);

    const failedShapeProjection = createLiquidToolingProjection({
      document,
      authoringContext,
      tooling: {
        getCatalog,
        getValueShape: vi.fn().mockResolvedValue({ state: "unavailable" } as never),
        getCompletions: vi.fn().mockResolvedValue({ state: "ready", data: { items: [{ label: "ambientFallback" }] } } as never)
      }
    });
    const memberSource = "{{ customer. ";
    await expect(failedShapeProjection.completionProvider({
      document: { ...document, value: memberSource }, position: memberSource.length, explicit: true, signal: new AbortController().signal
    })).resolves.toEqual([]);
  });

  it.each(["unavailable", "unauthorized", "incompatible", "stale", "canceled"] as const)(
    "does not fall back to direct completion or hover when catalog is %s",
    async state => {
    const getCatalog = vi.fn().mockResolvedValue({ state } as never);
    const projection = setup(getCatalog);
    const source = "{{ customer }}";
    const position = source.indexOf("customer") + 2;
    expect(await projection.completionProvider({
      document: { ...document, value: source }, position, explicit: true, signal: new AbortController().signal
    })).toEqual([]);
    expect(await projection.hoverProvider({ ...document, value: source }, position, new AbortController().signal)).toBeNull();
    expect(await projection.signatureProvider({ ...document, value: source }, position, new AbortController().signal)).toBeNull();
  });

  it("keeps a supported-empty Liquid catalog empty without using direct semantic completions or hover", async () => {
    const getCatalog = vi.fn().mockResolvedValue({ state: "supported-empty", data: { symbols: [] } });
    const getCompletions = vi.fn().mockResolvedValue({ state: "ready", data: { items: [{ label: "ambientStatic" }] } });
    const getHover = vi.fn().mockResolvedValue({ state: "ready", data: { contents: "ambient static hover" } });
    const projection = createLiquidToolingProjection({
      document,
      authoringContext,
      tooling: { getCatalog, getCompletions, getHover }
    });
    const source = "{{ value | safeFilter }}";
    const position = source.indexOf("safeFilter") + 3;

    await expect(projection.completionProvider({
      document: { ...document, value: source }, position, explicit: true, signal: new AbortController().signal
    })).resolves.toEqual([]);
    await expect(projection.hoverProvider({ ...document, value: source }, position, new AbortController().signal)).resolves.toBeNull();
    expect(getCatalog).toHaveBeenCalledTimes(2);
    expect(getCompletions).not.toHaveBeenCalled();
    expect(getHover).not.toHaveBeenCalled();
  });

  it("offers only an explicit generic interpolation snippet in plain template text", async () => {
    const projection = setup();
    const source = "Hello world";
    const position = source.length;
    expect(await projection.completionProvider({
      document: { ...document, value: source }, position, explicit: false, signal: new AbortController().signal
    })).toEqual([]);
    expect(await projection.completionProvider({
      document: { ...document, value: source }, position, explicit: true, signal: new AbortController().signal
    })).toMatchObject([{ label: "{{ }}", apply: "{{ ${1:value} }}", snippet: true, range: { from: position, to: position } }]);
  });
});
