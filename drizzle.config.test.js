import { defineConfig } from 'drizzle-kit';

// The same tables, pushed to the test database (TEST_DATABASE_URL in .env).
export default defineConfig({
	schema: ['./src/lib/server/db/schema.js', './src/lib/server/db/auth.schema.js'],
	dialect: 'postgresql',
	dbCredentials: { url: process.env.TEST_DATABASE_URL },
	verbose: true,
	strict: true
});
