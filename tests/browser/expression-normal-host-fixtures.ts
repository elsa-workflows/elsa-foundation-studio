import { test as base, expect, type Page } from "@playwright/test";
import { buildNormalHosts, hostVariants, startNormalHostPair } from "../../scripts/expression-normal-host.mjs";

export type NormalHostVariant = typeof hostVariants[number];
export type NormalHostPair = Awaited<ReturnType<typeof startNormalHostPair>>;

type NormalHostFixtures = {
  hostVariant: NormalHostVariant;
  hostPair: NormalHostPair;
  signInToStudio: (page: Page, pair: NormalHostPair) => Promise<void>;
  recordSafeBackendTraffic: (page: Page, pair: NormalHostPair) => SafeBackendTraffic[];
  recordSafeConsoleErrors: (page: Page) => string[];
};

export type SafeBackendTraffic = { path: string; status?: number; expressionType?: string };
export type PersistedExpressionDraft = {
  definitionId: string;
  draftId: string;
  targetNodeId: string;
  propertyKey: string;
  inputName: string;
  outputName: string;
  initialSyntax: "JavaScript" | "Liquid";
};

/** Playwright runs this once before starting workers, so all host variants share one reviewed build. */
export default async function globalSetup() {
  await buildNormalHosts();
}

export const test = base.extend<NormalHostFixtures>({
  hostVariant: ["complete", { option: true }],
  hostPair: [async ({ hostVariant }, use) => {
    const pair = await startNormalHostPair(hostVariant);
    try {
      await use(pair);
    } finally {
      await pair.stop();
    }
  }, { timeout: 1_300_000 }],
  // eslint-disable-next-line no-empty-pattern -- Playwright requires a destructuring fixture signature even without dependencies.
  signInToStudio: async ({}, fixtureUse) => {
    await fixtureUse(async function signIn(page, pair) {
      const studioPath = new URL("/studio/", pair.studioUrl).toString();
      const loginUrl = new URL("/_elsa/identity/login", pair.foundationUrl);
      loginUrl.searchParams.set("returnUrl", studioPath);
      await page.goto(loginUrl.toString());
      await page.locator("#username").fill("admin");
      await page.locator("#password").fill("Password123!");
      await page.getByRole("button", { name: "Sign in" }).click();
      await page.waitForURL(studioPath);
      await expect(page.locator("body")).not.toContainText("Sign in to continue");
    });
  },
  // eslint-disable-next-line no-empty-pattern -- Playwright requires a destructuring fixture signature even without dependencies.
  recordSafeBackendTraffic: async ({}, fixtureUse) => {
    await fixtureUse(function record(page, pair) {
      const traffic: SafeBackendTraffic[] = [];
      const byRequest = new Map<object, SafeBackendTraffic>();
      page.on("request", request => {
        if (new URL(request.url()).origin === pair.foundationUrl) {
          const path = new URL(request.url()).pathname;
          const postData = path.includes("/expression-tooling/") ? request.postDataJSON() as { expressionType?: unknown } | null : null;
          const syntax = postData?.expressionType;
          const record = {
            path,
            ...(syntax === "JavaScript" || syntax === "Liquid" ? { expressionType: syntax } : {})
          };
          traffic.push(record);
          byRequest.set(request, record);
        }
      });
      page.on("response", response => {
        if (new URL(response.url()).origin === pair.foundationUrl) {
          const record = byRequest.get(response.request());
          if (record) record.status = response.status();
        }
      });
      return traffic;
    });
  },
  // eslint-disable-next-line no-empty-pattern -- Playwright requires a destructuring fixture signature even without dependencies.
  recordSafeConsoleErrors: async ({}, fixtureUse) => {
    await fixtureUse(function record(page) {
      const errors: string[] = [];
      page.on("console", message => {
        if (message.type() === "error") errors.push("console-error");
      });
      page.on("pageerror", () => errors.push("uncaught-exception"));
      return errors;
    });
  }
});

export const completeTest = test.extend<{ hostVariant: NormalHostVariant }>({
  hostVariant: ["complete", { option: true }]
});
export const missingJavaScriptEditorTest = test.extend<{ hostVariant: NormalHostVariant }>({
  hostVariant: ["missing-javascript-editor", { option: true }]
});
export const missingLiquidProviderTest = test.extend<{ hostVariant: NormalHostVariant }>({
  hostVariant: ["missing-liquid-provider", { option: true }]
});

/** Seeds a real SQLite-backed draft using the authenticated host's live activity catalog. */
export async function createPersistedExpressionDraft(
  page: Page,
  pair: NormalHostPair,
  initialSyntax: PersistedExpressionDraft["initialSyntax"] = "JavaScript"
): Promise<PersistedExpressionDraft> {
  const client = page.request;
  const readLine = await findActivityVersion(client, pair, "Elsa.Activities.Primitives.Activities.ReadLine");
  const writeLine = await findActivityVersion(client, pair, "Elsa.Activities.Primitives.Activities.WriteLine");
  const sequence = await findActivityVersion(client, pair, "Elsa.Activities.Sequence.Activities.Sequence");
  const textInput = writeLine.inputs.find(input => String(input.name).toLowerCase() === "text");
  const predecessorOutput = readLine.outputs[0];
  const targetNodeId = "target";
  if (!textInput?.referenceKey || !predecessorOutput?.name) {
    throw new Error("The live activity catalog does not expose the expected text input and predecessor output.");
  }

  const definitionResponse = await client.post(new URL("/design/workflows/definitions", pair.foundationUrl).toString(), {
    data: {
      name: "Expression tooling persisted browser draft",
      initialState: {
        inputs: [{ referenceKey: "browser-customer-key", name: "customerName", type: { alias: "String", collectionKind: "single" }, displayName: "Customer name", isNullable: true }],
        variables: [{ referenceKey: "browser-global-key", name: "globalLabel", type: { alias: "String", collectionKind: "single" }, storageDriverType: null, default: null }],
        rootActivity: {
          nodeId: "root",
          activityVersionId: sequence.versionId,
          inputs: [],
          outputs: [],
          structure: {
            kind: "elsa.sequence.structure",
            schemaVersion: "1.0.0",
            payload: {
              variables: [{ referenceKey: "browser-scoped-key", name: "scopedLabel", type: { alias: "String", collectionKind: "single" }, storageDriverType: null, default: null }],
              activities: [
                { nodeId: "predecessor", activityVersionId: readLine.versionId, inputs: [], outputs: [] },
                { nodeId: targetNodeId, activityVersionId: writeLine.versionId, inputs: [{
                  referenceKey: textInput.referenceKey,
                  value: { value: initialSyntax === "JavaScript" ? "args.predecessor." : "{{ customerName }}", expressionType: initialSyntax },
                  autoEvaluate: null,
                  evaluatorType: null,
                  storageDriverType: null,
                  isSensitive: null
                }], outputs: [] }
              ]
            }
          }
        }
      }
    }
  });
  if (definitionResponse.status() !== 201) throw new Error(`Persisted workflow draft creation failed with HTTP ${definitionResponse.status()}.`);
  const created = await definitionResponse.json();
  const definitionId = created?.definition?.id;
  const draftId = created?.draft?.id;
  if (typeof definitionId !== "string" || typeof draftId !== "string") {
    throw new Error("Persisted workflow creation did not return a definition and draft identity.");
  }

  const reopenedResponse = await client.get(new URL(`/design/workflows/drafts/${encodeURIComponent(draftId)}`, pair.foundationUrl).toString());
  if (!reopenedResponse.ok()) throw new Error(`Fresh persisted workflow draft read failed with HTTP ${reopenedResponse.status()}.`);
  const reopened = await reopenedResponse.json();
  const activities = reopened?.state?.rootActivity?.structure?.payload?.activities;
  const target = Array.isArray(activities) ? activities.find((activity: { nodeId?: string }) => activity.nodeId === targetNodeId) : null;
  if (reopened?.id !== draftId || target?.inputs?.[0]?.referenceKey !== textInput.referenceKey) {
    throw new Error("The fresh workflow draft read did not preserve the dynamically discovered target activity input.");
  }
  return { definitionId, draftId, targetNodeId, propertyKey: textInput.referenceKey, inputName: textInput.name, outputName: predecessorOutput.name, initialSyntax };
}

export async function discoverActivityVersion(
  page: Page,
  pair: NormalHostPair,
  activityTypeKey: string
) {
  return findActivityVersion(page.request, pair, activityTypeKey);
}

export async function readActivityDefinitionDraft(page: Page, pair: NormalHostPair, draftId: string) {
  const capabilityResponse = await page.request.get(new URL("/capabilities", pair.foundationUrl).toString());
  if (!capabilityResponse.ok()) throw new Error(`API capability discovery failed with HTTP ${capabilityResponse.status()}.`);
  const capabilityDocument = await capabilityResponse.json();
  const links = capabilityDocument?.capabilities?.find((capability: { id?: string }) => capability.id === "elsa.api.activity-design")?.links;
  const href = Array.isArray(links)
    ? links.find((link: { rel?: string }) => link.rel === "activity-definition-draft")?.href
    : undefined;
  if (typeof href !== "string") throw new Error("The activity-design capability does not advertise its draft relation.");
  const path = href.replace("{draftId}", encodeURIComponent(draftId));
  const response = await page.request.get(new URL(path, pair.foundationUrl).toString());
  if (!response.ok()) throw new Error(`Fresh Activity Definition draft read failed with HTTP ${response.status()}.`);
  return response.json();
}

async function findActivityVersion(client: Page["request"], pair: NormalHostPair, activityTypeKey: string) {
  const definitionsResponse = await client.get(new URL(`/design/activities/definitions?search=${encodeURIComponent(activityTypeKey)}`, pair.foundationUrl).toString());
  if (!definitionsResponse.ok()) throw new Error(`Live activity discovery failed with HTTP ${definitionsResponse.status()}.`);
  const definitions = await definitionsResponse.json();
  const definition = definitions?.items?.map((item: { definition?: Record<string, unknown> }) => item.definition)
    .find((item: { activityTypeKey?: string }) => item?.activityTypeKey === activityTypeKey);
  const versionId = definition?.headVersionId;
  if (typeof versionId !== "string") throw new Error("Live activity discovery did not return the advertised head version.");
  const versionResponse = await client.get(new URL(`/design/activities/versions/${encodeURIComponent(versionId)}`, pair.foundationUrl).toString());
  if (!versionResponse.ok()) throw new Error(`Live activity version read failed with HTTP ${versionResponse.status()}.`);
  const version = await versionResponse.json();
  const inputs = version?.contract?.inputs;
  const outputs = version?.contract?.outputs;
  if (!Array.isArray(inputs) || !Array.isArray(outputs)) throw new Error("The live activity version has no input/output contract arrays.");
  return { versionId, displayName: String(definition.displayName ?? definition.activityTypeKey), inputs, outputs };
}

export { expect };
