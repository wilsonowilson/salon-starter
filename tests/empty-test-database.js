import postgres from 'postgres';
import { hashPassword } from 'better-auth/crypto';

// Runs once before the tests: every run starts with no bookings, the four styles, and Mrs Bisi's account.
export default async function emptyTestDatabase() {
	const sql = postgres(process.env.TEST_DATABASE_URL);
	await sql`delete from bookings`;
	await sql`delete from styles`;
	await sql`insert into styles (name) values ('Knotless braids'), ('Cornrows'), ('Wash and set'), ('Silk press')`;

	// The day view tests log in as Mrs Bisi (the same made-up account as npm run db:seed).
	const bisi = await sql`select id from "user" where email = 'bisi@bisisalon.example'`;
	if (bisi.length === 0) {
		const id = crypto.randomUUID();
		const password = await hashPassword('jollof123');
		await sql`insert into "user" (id, name, email, email_verified) values (${id}, 'Mrs Bisi', 'bisi@bisisalon.example', true)`;
		await sql`insert into account (id, account_id, provider_id, user_id, password, updated_at) values (${crypto.randomUUID()}, ${id}, 'credential', ${id}, ${password}, now())`;
	}

	await sql.end();
	console.log('Test database: bookings emptied.');
}
