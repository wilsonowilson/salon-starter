import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '#lib/server/db/index.js';
import { styles, bookings } from '#lib/server/db/schema.js';
import { showDay } from '#lib/moments.js';

export async function load({ locals, url }) {
	if (locals.user === undefined) {
		redirect(303, '/login');
	}

	const date = url.searchParams.get('date');
	let day = new Date();
	if (date !== null) {
		day = new Date(`${date}T00:00:00+01:00`);
	}

	const allBookings = await db
		.select({
			id: bookings.id,
			customerName: bookings.customerName,
			phone: bookings.phone,
			startsAt: bookings.startsAt,
			style: styles.name
		})
		.from(bookings)
		.innerJoin(styles, eq(bookings.styleId, styles.id))
		.orderBy(bookings.startsAt);
	const dayBookings = allBookings.filter((b) => showDay(b.startsAt) === showDay(day));

	return { dayName: showDay(day), bookings: dayBookings };
}
