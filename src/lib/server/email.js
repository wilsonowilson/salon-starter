import { dev } from '$app/env';
import { RESEND_API_KEY } from '$app/env/private';

export async function sendEmail({ to, subject, text }) {
	if (!RESEND_API_KEY) {
		if (dev) {
			console.log(`No RESEND_API_KEY, so this email was not sent.\nTo: ${to}\nSubject: ${subject}\n${text}`);
		}
		return;
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: "Bisi's Salon <onboarding@resend.dev>",
			to: to,
			subject: subject,
			text: text
		})
	});

	if (!response.ok) {
		console.error('Resend did not send the email:', response.status, await response.text());
	}
}
