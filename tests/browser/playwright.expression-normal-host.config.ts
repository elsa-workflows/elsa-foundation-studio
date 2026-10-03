import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "expression-normal-host.spec.ts",
  globalSetup: "./expression-normal-host-fixtures.ts",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  timeout: 300_000,
  expect: { timeout: 30_000 },
  // Traces and screenshots can retain expression source or authenticated request data. The host
  // suite reports only route names, status codes, and value-free assertions on failure.
  use: {
    ...devices["Desktop Chrome"],
    trace: "off",
    screenshot: "off",
    video: "off"
  },
  projects: [{ name: "chromium-normal-host", use: { ...devices["Desktop Chrome"] } }]
});
