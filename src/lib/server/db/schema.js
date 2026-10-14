import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const styles = pgTable('styles', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});

export const bookings = pgTable('bookings', {
	id: serial('id').primaryKey(),
	styleId: integer('style_id')
		.notNull()
		.references(() => styles.id),
	customerName: text('customer_name').notNull(),
	phone: text('phone').notNull(),
	startsAt: timestamp('starts_at', { withTimezone: true }).notNull()
});
