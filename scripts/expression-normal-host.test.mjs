import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { configureShells, reserveLoopbackOrigin, resolveFoundationRoot, stopOwnedProcess } from "./expression-normal-host.mjs";

const shells = features => ({ CShells: { Shells: { default: { Features: features } } } });

test("the paired gate fails before launch without an explicit matching Foundation checkout", async () => {
  await assert.rejects(resolveFoundationRoot({}), /Set ELSA_FOUNDATION_WORKTREE/);
});

test("negative controls remove one real feature and retain the other language without mutating source config", () => {
  const backend = shells({ JavaScriptExpressions: {}, Liquid: {} });
  const frontend = shells({ JavaScriptExpressionEditorStudio: {}, LiquidExpressionEditorStudio: {} });
  assert.deepEqual(configureShells(backend, "missing-liquid-provider").CShells.Shells.default.Features, { JavaScriptExpressions: {} });
  assert.deepEqual(configureShells(frontend, "missing-javascript-editor", "http://127.0.0.1:1234").CShells.Shells.default.Features,
    { LiquidExpressionEditorStudio: {} });
  assert.ok(backend.CShells.Shells.default.Features.Liquid);
  assert.ok(frontend.CShells.Shells.default.Features.JavaScriptExpressionEditorStudio);
  assert.throws(() => configureShells(shells({ JavaScriptExpressions: {} }), "complete"), /must compose its real Liquid feature/);
});

test("teardown stops only its owned child and leaves a bystander process running", async () => {
  const keepAlive = "setInterval(() => {}, 1000)";
  const owned = spawn(process.execPath, ["-e", keepAlive], { stdio: "ignore" });
  const bystander = spawn(process.execPath, ["-e", keepAlive], { stdio: "ignore" });
  await Promise.all([once(owned, "spawn"), once(bystander, "spawn")]);
  try {
    await stopOwnedProcess(owned, 1_000);
    assert.notEqual(owned.signalCode, null);
    assert.equal(bystander.exitCode, null);
    assert.equal(bystander.signalCode, null);
    await stopOwnedProcess(owned);
  } finally { await stopOwnedProcess(bystander); }
});

test("the Studio origin reservation is loopback-only and release is idempotent", async () => {
  const reservation = await reserveLoopbackOrigin();
  try { assert.match(reservation.origin, /^http:\/\/127\.0\.0\.1:\d+$/); }
  finally { await reservation.release(); }
  await reservation.release();
});

test("teardown tolerates a process which could not spawn", async () => {
  const failed = spawn("/nonexistent/elsa-expression-host", [], { stdio: "ignore" });
  await once(failed, "error");
  await stopOwnedProcess(failed);
});
