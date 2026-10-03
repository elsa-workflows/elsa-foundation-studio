import { spawn } from "node:child_process";
import { once } from "node:events";
import { randomUUID } from "node:crypto";
import { cp, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const studioRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const foundationProject = "src/apps/Elsa.Workbench";
const studioProject = "src/apps/Elsa.Studio.Web";
export const hostVariants = ["complete", "missing-javascript-editor", "missing-liquid-provider"];

export async function resolveFoundationRoot(environment = process.env) {
  const configured = environment.ELSA_FOUNDATION_WORKTREE;
  if (!configured) throw new Error("Set ELSA_FOUNDATION_WORKTREE to the matching Foundation source checkout before running expression normal-host tests.");
  const root = await realpath(configured);
  await readFile(join(root, foundationProject, "Elsa.Workbench.csproj"));
  return root;
}

function run(command, args, cwd) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", code => code === 0 ? resolveRun() : reject(new Error(`${command} exited with code ${code}.`)));
  });
}

export async function buildNormalHosts() {
  const foundationRoot = await resolveFoundationRoot();
  // The normal dotnet command deliberately uses the shared machine's build-slot wrapper.
  await run("dotnet", ["build", join(foundationProject, "Elsa.Workbench.csproj"), "-c", "Release"], foundationRoot);
  await run("pnpm", ["install", "--frozen-lockfile"], studioRoot);
  await run("pnpm", ["-r", "--workspace-concurrency=1", "build"], studioRoot);
  await run("dotnet", ["build", join(studioProject, "Elsa.Studio.Web.csproj"), "-c", "Release"], studioRoot);
}

export async function stopOwnedProcess(child, graceMilliseconds = 10_000) {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
  const exited = once(child, "exit");
  child.kill("SIGTERM");
  const timeout = setTimeout(() => child.kill("SIGKILL"), graceMilliseconds);
  try { await exited; } finally { clearTimeout(timeout); }
}

export async function reserveLoopbackOrigin() {
  const listener = createServer();
  listener.listen(0, "127.0.0.1");
  await once(listener, "listening");
  const origin = `http://127.0.0.1:${listener.address().port}`;
  return { origin, release: () => new Promise((resolveRelease, reject) =>
    listener.close(error => error && error.code !== "ERR_SERVER_NOT_RUNNING" ? reject(error) : resolveRelease())) };
}

export async function startOwnedHost(dll, contentRoot, environment, readyPath, timeoutMilliseconds = 600_000, bindAddress = "http://127.0.0.1:0") {
  const child = spawn("dotnet", [dll, "--contentRoot", contentRoot], {
    cwd: contentRoot,
    env: {
      ...process.env,
      ...environment,
      ASPNETCORE_ENVIRONMENT: "Development",
      ASPNETCORE_URLS: bindAddress,
      "Logging__LogLevel__Microsoft.Hosting.Lifetime": "Information"
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  // Retain only the bind address. Source, identifiers and host logs never enter test failure output.
  let output = "";
  let baseUrl;
  let spawnError;
  child.once("error", error => { spawnError = error; });
  child.stdout.on("data", chunk => {
    output = (output + chunk.toString()).slice(-2_048);
    baseUrl ??= output.match(/Now listening on:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];
  });
  child.stderr.resume();
  const deadline = Date.now() + timeoutMilliseconds;
  try {
    while (Date.now() < deadline) {
      if (spawnError) throw spawnError;
      if (child.exitCode !== null || child.signalCode !== null)
        throw new Error(`Owned host exited before readiness (code ${child.exitCode}, signal ${child.signalCode}).`);
      if (baseUrl) {
        try {
          const response = await fetch(`${baseUrl}${readyPath}`, { signal: AbortSignal.timeout(5_000) });
          if (response.ok) return { child, baseUrl, stop: () => stopOwnedProcess(child) };
        } catch { /* A cold shell may not yet have mapped its routes. */ }
      }
      await new Promise(resolveWait => setTimeout(resolveWait, 200));
    }
    throw new Error(`Owned host did not become ready within ${timeoutMilliseconds / 1_000} seconds.`);
  } catch (error) {
    await stopOwnedProcess(child);
    throw error;
  }
}

export function configureShells(shells, variant, backendOrigin) {
  const configured = structuredClone(shells);
  const shell = Object.values(configured.CShells.Shells)[0];
  if (!shell) throw new Error("Normal-host configuration has no shell.");
  if (backendOrigin) {
    // Source registration is exercised; the negative control removes just one editor feature.
    if (variant === "missing-javascript-editor") delete shell.Features.JavaScriptExpressionEditorStudio;
  } else {
    if (!Object.hasOwn(shell.Features, "Liquid"))
      throw new Error("The matching Workbench must compose its real Liquid feature before running this gate.");
    if (variant === "missing-liquid-provider") delete shell.Features.Liquid;
  }
  return configured;
}

async function copyHostConfiguration(source, destination, variant, backendOrigin) {
  await mkdir(destination, { recursive: true });
  await cp(join(source, "appsettings.json"), join(destination, "appsettings.json"));
  await cp(join(source, "appsettings.Development.json"), join(destination, "appsettings.Development.json"))
    .catch(error => { if (error.code !== "ENOENT") throw error; });
  const shells = JSON.parse(await readFile(join(source, "shells.json"), "utf8"));
  await writeFile(join(destination, "shells.json"), JSON.stringify(configureShells(shells, variant, backendOrigin), null, 2));
  await mkdir(join(destination, "packages"));
}

export async function startNormalHostPair(variant = "complete") {
  if (!hostVariants.includes(variant)) throw new Error(`Unknown expression host variant: ${variant}`);
  const studioHostId = "expression-normal-host";
  const foundationRoot = await resolveFoundationRoot();
  const directory = await mkdtemp(join(tmpdir(), "elsa-expression-normal-host-"));
  const hosts = [];
  let studioPort;
  const stop = async () => {
    const results = await Promise.allSettled(hosts.toReversed().map(host => host.stop()));
    await studioPort?.release();
    await rm(directory, { recursive: true, force: true });
    const failure = results.find(result => result.status === "rejected");
    if (failure) throw failure.reason;
  };
  try {
    studioPort = await reserveLoopbackOrigin();
    const managementKey = randomUUID();
    const backendContent = join(directory, "foundation");
    await copyHostConfiguration(join(foundationRoot, foundationProject), backendContent, variant);
    const backend = await startOwnedHost(
      join(foundationRoot, foundationProject, "bin/Release/net10.0/Elsa.Workbench.dll"),
      backendContent,
      { Nuplane__Setup__StateFilePath: join(backendContent, "nuplane-state.json"),
        ConnectionStrings__Elsa: `Data Source=${join(backendContent, "elsa.db")};Pooling=False`,
        Elsa__ModuleManagement__ApiKey: managementKey,
        Cors__AllowedOrigins__0: studioPort.origin,
        CShells__Shells__default__Features__FoundationIdentityAspNetCoreIdentity__AllowedReturnUrlOrigins__0: studioPort.origin },
      "/health/ready"
    );
    hosts.push(backend);
    const frontendContent = join(directory, "studio");
    await copyHostConfiguration(join(studioRoot, studioProject), frontendContent, variant, backend.baseUrl);
    // Release immediately before Kestrel binds. A lost reservation fails startup; it never reuses another host.
    await studioPort.release();
    const frontend = await startOwnedHost(
      join(studioRoot, studioProject, "bin/Release/net10.0/Elsa.Studio.Web.dll"),
      frontendContent,
      { Studio__HostId: studioHostId, Studio__BackendBaseUrl: backend.baseUrl, Studio__BackendServerBaseUrl: backend.baseUrl,
        Studio__BackendModuleManagementApiKey: managementKey,
        Nuplane__Setup__StateFilePath: join(frontendContent, "nuplane-state.json") },
      "/studio-runtime.js", 600_000, studioPort.origin
    );
    hosts.push(frontend);
    return { studioUrl: frontend.baseUrl, foundationUrl: backend.baseUrl, studioHostId, directory, variant, stop };
  } catch (error) {
    await stop();
    throw error;
  }
}
