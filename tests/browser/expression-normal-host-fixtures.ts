import { test as base, expect, type Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";
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

export type SafeBackendTraffic = {
  path: string;
  method: string;
  host: "foundation" | "studio";
  status?: number;
  expressionType?: string;
  documentRevision?: string;
  contextRevision?: string;
  workflowDraftId?: string;
  nodeId?: string;
  propertyKey?: string;
  isCatalogSearch?: boolean;
  outcomeState?: number;
  responseDocumentRevision?: string;
  responseContextRevision?: string;
  diagnosticCodes?: string[];
};
export type PersistedExpressionDraft = {
  definitionId: string;
  draftId: string;
  targetNodeId: string;
  propertyKey: string;
  inputName: string;
  outputName: string;
  initialSyntax: "JavaScript" | "Liquid";
};

// Retain only bounded opaque hex revisions, including the profile-composed SHA-256 revision.
function isSafeContextRevision(value: unknown): value is string {
  return typeof value === "string" && /^(?:[a-f0-9]{32}|[a-f0-9]{64})$/i.test(value);
}

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
      const studioPath = new URL("/", pair.studioUrl).toString();
      const authenticatedPath = new URL("/health/ready", pair.foundationUrl).toString();
      const loginUrl = new URL("/_elsa/identity/login", pair.foundationUrl);
      loginUrl.searchParams.set("returnUrl", "/health/ready");
      await page.goto(loginUrl.toString());
      await page.locator("#username").fill("admin");
      await page.locator("#password").fill("Password123!");
      await page.getByRole("button", { name: "Sign in" }).click();
      await page.waitForURL(authenticatedPath, { timeout: 30_000 });
      // A fresh database has no preferences: the real API correctly returns 404 for
      // absent documents. Seed ordinary defaults before the app's first read, through
      // the signed-in user's API rather than mutating storage or hiding console errors.
      for (const [namespace, value] of [
        ["dashboard", { refreshIntervalMs: 300_000, autoAddNewWidgets: true, widgets: [] }],
        ["attention", { snoozes: [] }]
      ] as const) {
        const response = await page.request.put(new URL(`/_elsa/studio/preferences/${namespace}`, pair.foundationUrl).toString(), {
          headers: { "X-Elsa-Studio-Host-Id": pair.studioHostId, "If-None-Match": "*" },
          data: { schemaVersion: 1, value }
        });
        if (response.status() !== 200) throw new Error(`Preference fixture creation failed with HTTP ${response.status()}.`);
      }
      await page.goto(studioPath);
      await expect(page.locator("body")).not.toContainText("Sign in to continue");
      // Let the actual stream connect before a full navigation unmounts its panel.
      await expect(page.locator(".console-stream-status.online")).toBeVisible();
    });
  },
  // eslint-disable-next-line no-empty-pattern -- Playwright requires a destructuring fixture signature even without dependencies.
  recordSafeBackendTraffic: async ({}, fixtureUse, testInfo) => {
    const recordings: SafeBackendTraffic[][] = [];
    await fixtureUse(function record(page, pair) {
      const traffic: SafeBackendTraffic[] = [];
      recordings.push(traffic);
      const byRequest = new Map<object, SafeBackendTraffic>();
      page.on("request", request => {
        const origin = new URL(request.url()).origin;
        if (origin === pair.foundationUrl || origin === pair.studioUrl) {
          const path = new URL(request.url()).pathname;
          const postData = path.includes("/expression-tooling/")
            ? request.postDataJSON() as { expressionType?: unknown; documentRevision?: unknown; contextRevision?: unknown; workflowDraftId?: unknown; nodeId?: unknown; propertyKey?: unknown; skip?: unknown; take?: unknown } | null
            : null;
          const syntax = postData?.expressionType;
          const documentRevision = postData?.documentRevision;
          const contextRevision = postData?.contextRevision;
          const workflowDraftId = postData?.workflowDraftId;
          const nodeId = postData?.nodeId;
          const propertyKey = postData?.propertyKey;
          const record = {
            path,
            method: request.method(),
            host: origin === pair.foundationUrl ? "foundation" as const : "studio" as const,
            // Classify catalog paging without retaining search text or authored source.
            ...(path.endsWith("/expression-tooling/context") ? { isCatalogSearch: postData?.take === 100 && typeof postData?.skip === "number" } : {}),
            ...(syntax === "JavaScript" || syntax === "Liquid" ? { expressionType: syntax } : {}),
            ...(typeof documentRevision === "string" || typeof documentRevision === "number" ? { documentRevision: String(documentRevision) } : {}),
            ...(isSafeContextRevision(contextRevision) ? { contextRevision } : {}),
            ...(typeof workflowDraftId === "string" ? { workflowDraftId } : {}),
            ...(typeof nodeId === "string" ? { nodeId } : {}),
            ...(typeof propertyKey === "string" ? { propertyKey } : {})
          };
          traffic.push(record);
          byRequest.set(request, record);
        }
      });
      page.on("response", response => {
        const origin = new URL(response.url()).origin;
        if (origin === pair.foundationUrl || origin === pair.studioUrl) {
          const record = byRequest.get(response.request());
          if (!record) return;
          record.status = response.status();
          if (record.path.includes("/expression-tooling/")) {
            void response.json().then((body: { result?: {
              state?: unknown;
              documentRevision?: unknown;
              contextRevision?: unknown;
              payload?: { diagnostics?: Array<{ code?: unknown }> };
            } }) => {
              const outcome = body.result;
              if (typeof outcome?.state === "number") record.outcomeState = outcome.state;
              if (typeof outcome?.documentRevision === "string" && /^\d+$/.test(outcome.documentRevision)) {
                record.responseDocumentRevision = outcome.documentRevision;
              }
              if (isSafeContextRevision(outcome?.contextRevision)) {
                record.responseContextRevision = outcome.contextRevision;
              }
              const diagnostics = outcome?.payload?.diagnostics;
              if (Array.isArray(diagnostics)) {
                // Only known provider codes are retained. Parser messages/source and auth data
                // never enter the traffic record or failure output.
                record.diagnosticCodes = diagnostics.flatMap(diagnostic =>
                  diagnostic.code === "JavaScript/Syntax" || diagnostic.code === "JavaScript/AmbientCapability" ||
                  diagnostic.code === "Liquid/Syntax" ? [diagnostic.code] : []);
              }
            }).catch(() => undefined);
          }
        }
      });
      return traffic;
    });
    if (testInfo.status !== testInfo.expectedStatus) {
      const path = testInfo.outputPath("expression-tooling-safe-traffic.json");
      await writeFile(path, JSON.stringify(recordings.flat(), null, 2));
      await testInfo.attach("expression-tooling-safe-traffic", {
        path,
        contentType: "application/json"
      });
    }
  },
  // eslint-disable-next-line no-empty-pattern -- Playwright requires a destructuring fixture signature even without dependencies.
  recordSafeConsoleErrors: async ({}, fixtureUse) => {
    await fixtureUse(function record(page) {
      const errors: string[] = [];
      page.on("console", message => {
        if (message.type() !== "error") return;
        const location = message.location();
        // Keep only source locations and bounded browser/React codes, never arbitrary
        // console text, request URLs with queries, parser messages, or authored source.
        const path = location.url ? new URL(location.url, page.url()).pathname : "unknown-location";
        const browserCode = message.text().match(/\bnet::(ERR_[A-Z_]+)\b/)?.[1];
        const reactCode = message.text().match(/Minified React error #(\d+)/)?.[1];
        const httpStatus = message.text().match(/the server responded with a status of (\d{3})/)?.[1];
        const stoppedDuringNegotiation = message.text().includes("The connection was stopped during negotiation");
        errors.push(`console-error:${path}:${location.lineNumber}:${location.columnNumber}${browserCode ? `:${browserCode}` : ""}${reactCode ? `:react-${reactCode}` : ""}${httpStatus ? `:http-${httpStatus}` : ""}${stoppedDuringNegotiation ? ":signalr-stopped-during-negotiation" : ""}`);
      });
      page.on("pageerror", () => errors.push("uncaught-exception"));
      return errors;
    });
  }
});

export const completeTest = test.extend({
  hostVariant: "complete"
});
export const missingJavaScriptEditorTest = test.extend({
  hostVariant: "missing-javascript-editor"
});
export const missingLiquidProviderTest = test.extend({
  hostVariant: "missing-liquid-provider"
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
  if (definitionResponse.status() !== 200) throw new Error(`Persisted workflow draft creation failed with HTTP ${definitionResponse.status()}.`);
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
  return readAuthenticatedBackendJson(page, pair, path);
}

export async function readAuthenticatedBackendJson(page: Page, pair: NormalHostPair, path: string) {
  const url = new URL(path, pair.foundationUrl);
  if (url.origin !== new URL(pair.foundationUrl).origin) throw new Error("Authenticated backend reads must remain on the owned host.");
  const tokenResponse = await page.request.get(new URL("/_elsa/identity/token", pair.foundationUrl).toString());
  if (!tokenResponse.ok()) throw new Error(`Identity token request failed with HTTP ${tokenResponse.status()}.`);
  const tokenPayload = await tokenResponse.json() as { accessToken?: unknown };
  if (typeof tokenPayload.accessToken !== "string" || tokenPayload.accessToken.length === 0) {
    throw new Error("Identity token response did not contain an access token.");
  }
  const response = await page.request.get(url.toString(), {
    headers: { Authorization: `Bearer ${tokenPayload.accessToken}` }
  });
  if (!response.ok()) throw new Error(`Authenticated backend read failed with HTTP ${response.status()}.`);
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
