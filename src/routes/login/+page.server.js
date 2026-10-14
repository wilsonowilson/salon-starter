import { fail, redirect } from '@sveltejs/kit';
import { auth } from '#lib/server/auth.js';

export function load({ locals }) {
	if (locals.user !== undefined) {
		redirect(303, '/day');
	}
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (email === '' || password === '') {
			return fail(400, { email, message: 'Please fill in every box.' });
		}

		try {
			await auth.api.signInEmail({ body: { email, password } });
		} catch (error) {
			return fail(400, { email, message: 'Wrong email or password.' });
		}

		redirect(303, '/day');
	}
};
