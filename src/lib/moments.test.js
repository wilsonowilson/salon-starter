import { test, expect } from 'vitest';
import { showMoment } from './moments.js';

test('shows a moment as a clock in Lagos shows it', () => {
	const booking = new Date('2026-10-19T11:00:00+01:00');
	expect(showMoment(booking)).toBe('Mon, 19 Oct 2026, 11:00');
});
