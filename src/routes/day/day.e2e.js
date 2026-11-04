import { expect, test } from '@playwright/test';

// Stories 3 and 5: Mrs Bisi sees the day's bookings in time order, and cancels one.

async function book(page, time, name, phone) {
	await page.goto('/book?date=2030-03-06');
	await page.getByLabel('Style').selectOption('Wash and set');
	await page.getByLabel('Time').selectOption(time);
	await page.getByLabel('Your name').fill(name);
	await page.getByLabel('Phone number').fill(phone);
	await page.getByRole('button', { name: 'Book' }).click();
	await expect(page.getByRole('heading', { name: 'Booked' })).toBeVisible();
}

async function logIn(page) {
	await page.goto('/login');
	await page.getByLabel('Email').fill('bisi@bisisalon.example');
	await page.getByLabel('Password').fill('jollof123');
	await page.getByRole('button', { name: 'Log in' }).click();
	await expect(page.getByRole('heading', { name: /Bookings for/ })).toBeVisible();
}

test('Mrs Bisi sees the day in time order, and a cancelled slot is free again', async ({ page }) => {
	await book(page, '15:00', 'Funke', '08031110005');
	await book(page, '09:00', 'Ngozi', '08031110006');

	await logIn(page);
	await page.goto('/day?date=2030-03-06');
	const cards = page.getByText(/^\d\d:\d\d: /);
	await expect(cards).toHaveText(['09:00: Wash and set', '15:00: Wash and set']);

	await page.getByRole('button', { name: 'Cancel' }).first().click();
	await expect(cards).toHaveText(['15:00: Wash and set']);
	await expect(page.getByText('Ngozi')).toHaveCount(0);

	await page.goto('/book?date=2030-03-06');
	await expect(page.getByLabel('Time').locator('option')).toHaveText(['09:00', '11:00', '13:00', '17:00']);
});

test('nobody logged in cannot open the day view', async ({ page }) => {
	await page.goto('/day');
	await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
});
