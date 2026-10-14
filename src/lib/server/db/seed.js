import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { hashPassword } from 'better-auth/crypto';
import { styles } from './schema.js';
import { user, account } from './auth.schema.js';

// Run once with: npm run db:seed
// It adds the four styles and Mrs Bisi's account. The password is a made-up example: never use a real one here.
const starterStyles = [{ name: 'Knotless braids' }, { name: 'Cornrows' }, { name: 'Wash and set' }, { name: 'Silk press' }];
const bisi = { name: 'Mrs Bisi', email: 'bisi@bisisalon.example', password: 'jollof123' };

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

const existingStyles = await db.select().from(styles);
if (existingStyles.length === 0) {
	await db.insert(styles).values(starterStyles);
}

const existingUsers = await db.select().from(user).where(eq(user.email, bisi.email));
if (existingUsers.length === 0) {
	const id = crypto.randomUUID();
	await db.insert(user).values({ id, name: bisi.name, email: bisi.email, emailVerified: true });
	await db.insert(account).values({
		id: crypto.randomUUID(),
		accountId: id,
		providerId: 'credential',
		userId: id,
		password: await hashPassword(bisi.password)
	});
}

if (existingStyles.length === 0 && existingUsers.length === 0) {
	console.log(`Seeded: 4 styles and Mrs Bisi (${bisi.email}).`);
} else {
	console.log('The styles or Mrs Bisi were already there. Only what was missing was added.');
}

await client.end();
