import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { ORIGIN, BETTER_AUTH_SECRET } from '$app/env/private';
import { db } from '#lib/server/db/index.js';
import { user, session, account, verification } from '#lib/server/db/auth.schema.js';

export const auth = betterAuth({
	baseURL: ORIGIN,
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: { user, session, account, verification }
	}),
	// Only Mrs Bisi has an account (npm run db:seed makes it). Nobody can sign up.
	emailAndPassword: {
		enabled: true,
		disableSignUp: true
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
