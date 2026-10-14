import { defineConfig } from '@playwright/test';

// Read .env, so TEST_DATABASE_URL is known here.
process.loadEnvFile();

export default defineConfig({
	globalSetup: './tests/empty-test-database.js',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		timeout: 180000,
		env: { DATABASE_URL: process.env.TEST_DATABASE_URL }
	},
	testMatch: '**/*.e2e.{ts,js}'
});
