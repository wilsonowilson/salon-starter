// The start times Mrs Bisi offers every day.
export const slots = ['09:00', '11:00', '13:00', '15:00', '17:00'];

// A moment, as a clock in Lagos shows it: "Mon, 19 Oct 2026, 11:00".
export function showMoment(moment) {
	return moment.toLocaleString('en-GB', {
		timeZone: 'Africa/Lagos',
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

// The day only, in Lagos: "Mon, 19 Oct 2026".
export function showDay(moment) {
	return moment.toLocaleString('en-GB', {
		timeZone: 'Africa/Lagos',
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

// The time only, in Lagos: "11:00".
export function showTime(moment) {
	return moment.toLocaleString('en-GB', {
		timeZone: 'Africa/Lagos',
		hour: '2-digit',
		minute: '2-digit'
	});
}
