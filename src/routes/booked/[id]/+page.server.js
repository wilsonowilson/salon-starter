import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '#lib/server/db/index.js';
import { styles, bookings } from '#lib/server/db/schema.js';

export async function load({ params }) {
	const rows = await db
		.select({ customerName: bookings.customerName, startsAt: bookings.startsAt, style: styles.name })
		.from(bookings)
		.innerJoin(styles, eq(bookings.styleId, styles.id))
		.where(eq(bookings.id, Number(params.id)));
	const booking = rows[0];

	if (booking === undefined) {
		error(404, 'Booking not found');
	}

	return { booking };
}
