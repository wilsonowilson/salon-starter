import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '#lib/server/db/index.js';
import { styles, bookings } from '#lib/server/db/schema.js';
import { slots, showDay, showTime } from '#lib/moments.js';

export async function load({ url }) {
	const date = url.searchParams.get('date');
	const styleList = await db.select().from(styles).orderBy(styles.id);

	if (date === null) {
		return { styles: styleList, date: '', freeSlots: [] };
	}

	const dayStart = new Date(`${date}T00:00:00+01:00`);
	const allBookings = await db.select().from(bookings);
	const dayBookings = allBookings.filter((b) => showDay(b.startsAt) === showDay(dayStart));
	const takenTimes = dayBookings.map((b) => showTime(b.startsAt));
	const freeSlots = slots.filter((time) => takenTimes.includes(time) === false);

	return { styles: styleList, date, freeSlots };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			styleId: formData.get('styleId'),
			date: formData.get('date'),
			time: formData.get('time'),
			customerName: formData.get('customerName'),
			phone: formData.get('phone')
		};

		const errors = {};
		if (values.customerName === '') {
			errors.customerName = 'Enter your name.';
		}
		if (values.phone.length < 11) {
			errors.phone = 'A phone number has 11 digits, like 0803 123 4567.';
		}
		const styleList = await db.select().from(styles);
		const style = styleList.find((item) => item.id === Number(values.styleId));
		if (style === undefined) {
			errors.styleId = 'Choose a style from the list.';
		}
		if (slots.includes(values.time) === false) {
			errors.time = 'Choose a time from the list.';
		}
		if (Object.keys(errors).length > 0) {
			return fail(400, { values, errors });
		}

		const startsAt = new Date(`${values.date}T${values.time}:00+01:00`);

		if (startsAt < new Date()) {
			return fail(400, { values, errors: { time: 'That time is already over. Choose a later time.' } });
		}

		const taken = await db.select().from(bookings).where(eq(bookings.startsAt, startsAt));
		if (taken.length > 0) {
			return fail(400, { values, errors: { time: 'That time was just booked. Choose another time.' } });
		}

		const rows = await db
			.insert(bookings)
			.values({ styleId: style.id, customerName: values.customerName, phone: values.phone, startsAt })
			.returning();

		redirect(303, `/booked/${rows[0].id}`);
	}
};
