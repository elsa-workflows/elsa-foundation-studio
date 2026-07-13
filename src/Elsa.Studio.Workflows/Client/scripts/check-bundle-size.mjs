import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(packageRoot, "../wwwroot/studio/modules/workflows");
const manifest = JSON.parse(await readFile(resolve(outputRoot, ".vite/manifest.json"), "utf8"));

// Budgets deliberately cover the files the browser must parse for the authenticated Definitions
// landing path, not just whichever filename Rollup happens to call the entry chunk. The former
// 677.67 kB monolith is the independent baseline. These limits retain roughly 25–30% headroom over
// the first split build while staying well below Vite's 500 kB warning threshold.
const budgets = {
  entry: 125_000,
  definitionsLanding: 180_000,
  individualChunk: 500_000
};

const deferredHeavySurfaces = [
  "ActivityAvailabilityPage",
  "RuntimeDiagnosticsSettingsPage",
  "WorkflowDefinitions",
  "WorkflowEditor",
  "WorkflowExecutableInspector",
  "WorkflowExecutables",
  "WorkflowInstances"
];

const excludedFromDefinitionsLanding = deferredHeavySurfaces.filter(name => name !== "WorkflowDefinitions");

function collectStaticFiles(entryKey, files = new Set()) {
  const entry = manifest[entryKey];
  if (!entry) throw new Error(`Bundle manifest is missing ${entryKey}.`);

  files.add(entry.file);
  for (const cssFile of entry.css ?? []) files.add(cssFile);
  for (const importedKey of entry.imports ?? []) collectStaticFiles(importedKey, files);
  return files;
}

async function measure(files) {
  const result = { bytes: 0, gzipBytes: 0 };
  for (const file of files) {
    const content = await readFile(resolve(outputRoot, file));
    result.bytes += content.byteLength;
    result.gzipBytes += gzipSync(content).byteLength;
  }
  return result;
}

function formatBytes(bytes) {
  return `${(bytes / 1_000).toFixed(2)} kB`;
}

function assertBudget(label, actual, budget) {
  if (actual > budget) {
    throw new Error(`${label} is ${formatBytes(actual)}; budget is ${formatBytes(budget)}.`);
  }
}

function findChunk(name) {
  const chunk = Object.values(manifest).find(entry => entry.name === name);
  if (!chunk) throw new Error(`Bundle manifest is missing the ${name} chunk.`);
  return chunk;
}

for (const chunkName of deferredHeavySurfaces) {
  if (!findChunk(chunkName).isDynamicEntry) throw new Error(`${chunkName} is no longer emitted as a deferred entry.`);
}

const entryFiles = collectStaticFiles("src/module.tsx");
const definitionsLandingFiles = new Set(entryFiles);
collectStaticFiles("src/workflow-editor/pages.tsx", definitionsLandingFiles);
collectStaticFiles("src/workflow-editor/WorkflowDefinitions.tsx", definitionsLandingFiles);

for (const chunkName of excludedFromDefinitionsLanding) {
  const chunk = findChunk(chunkName);
  if (definitionsLandingFiles.has(chunk.file)) {
    throw new Error(`The authenticated Definitions landing path eagerly includes ${chunkName}.`);
  }
}

const [entrySize, definitionsLandingSize] = await Promise.all([
  measure(entryFiles),
  measure(definitionsLandingFiles)
]);

const jsFiles = [...new Set(Object.values(manifest).map(entry => entry.file).filter(file => file.endsWith(".js")))];
const jsSizes = await Promise.all(jsFiles.map(async file => ({ file, bytes: (await stat(resolve(outputRoot, file))).size })));
const largestChunk = jsSizes.reduce((largest, candidate) => candidate.bytes > largest.bytes ? candidate : largest);

assertBudget("Primary Workflows entry", entrySize.bytes, budgets.entry);
assertBudget("Authenticated Definitions landing path", definitionsLandingSize.bytes, budgets.definitionsLanding);
assertBudget(`Largest JavaScript chunk (${largestChunk.file})`, largestChunk.bytes, budgets.individualChunk);

console.log("Workflows bundle budget");
console.log(`  Primary entry:                    ${formatBytes(entrySize.bytes)} raw / ${formatBytes(entrySize.gzipBytes)} gzip (budget ${formatBytes(budgets.entry)})`);
console.log(`  Authenticated Definitions landing: ${formatBytes(definitionsLandingSize.bytes)} raw / ${formatBytes(definitionsLandingSize.gzipBytes)} gzip (budget ${formatBytes(budgets.definitionsLanding)})`);
console.log(`  Largest JavaScript chunk:          ${formatBytes(largestChunk.bytes)} (${largestChunk.file}; limit ${formatBytes(budgets.individualChunk)})`);
console.log(`  Deferred heavy surfaces:           ${deferredHeavySurfaces.length}`);
