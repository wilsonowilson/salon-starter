import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: ['./src/lib/server/db/schema.js', './src/lib/server/db/auth.schema.js'],
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL },
	verbose: true,
	strict: true
});
