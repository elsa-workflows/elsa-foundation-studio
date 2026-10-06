import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/runtime/expression-formatting-parity.test.ts"],
    testTimeout: 300_000,
    maxWorkers: 1,
    minWorkers: 1
  }
});
