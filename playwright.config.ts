import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5173',
    testIdAttribute: 'data-test-id',
  },
  testMatch: /.*\.test\.ts/,
})
