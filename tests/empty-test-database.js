import postgres from 'postgres';

// Runs once before the tests: every run starts with no bookings and the four styles.
export default async function emptyTestDatabase() {
	const sql = postgres(process.env.TEST_DATABASE_URL);
	await sql`delete from bookings`;
	await sql`delete from styles`;
	await sql`insert into styles (name) values ('Knotless braids'), ('Cornrows'), ('Wash and set'), ('Silk press')`;
	await sql.end();
	console.log('Test database: bookings emptied.');
}
