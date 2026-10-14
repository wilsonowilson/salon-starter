import { drizzle } from 'drizzle-orm/postgres-js';
import { dev } from '$app/env';
import { DATABASE_URL } from '$app/env/private';

// logger: dev prints the SQL of every query in the terminal while you develop.
export const db = drizzle(DATABASE_URL, { logger: dev });
