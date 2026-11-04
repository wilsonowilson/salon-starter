import { expect, test } from '@playwright/test';

// Story 2: the four checks in SPEC.md. Each test uses its own day, so the tests never share a slot.

test('a customer books a style at a free slot', async ({ page }) => {
	await page.goto('/book?date=2030-03-04');
	await page.getByLabel('Style').selectOption('Knotless braids');
	await page.getByLabel('Time').selectOption('11:00');
	await page.getByLabel('Your name').fill('Ada');
	await page.getByLabel('Phone number').fill('08031110001');
	await page.getByRole('button', { name: 'Book' }).click();
	await expect(page.getByRole('heading', { name: 'Booked' })).toBeVisible();
	await expect(page.getByText('Mon, 4 Mar 2030, 11:00')).toBeVisible();
});

test('an empty name shows Enter your name', async ({ page }) => {
	await page.goto('/book?date=2030-03-11');
	await page.getByLabel('Phone number').fill('08031110002');
	await page.getByRole('button', { name: 'Book' }).click();
	await expect(page.getByText('Enter your name.')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Booked' })).toHaveCount(0);
});

test('a booked slot is not in the list of free slots', async ({ page }) => {
	await page.goto('/book?date=2030-03-05');
	await page.getByLabel('Time').selectOption('11:00');
	await page.getByLabel('Your name').fill('Bola');
	await page.getByLabel('Phone number').fill('08031110003');
	await page.getByRole('button', { name: 'Book' }).click();
	await expect(page.getByRole('heading', { name: 'Booked' })).toBeVisible();

	await page.goto('/book?date=2030-03-05');
	await expect(page.getByLabel('Time').locator('option')).toHaveText(['09:00', '13:00', '15:00', '17:00']);
});

test('a time that is already over shows an error', async ({ page }) => {
	// Yesterday, as a calendar in Lagos shows it: every slot on that day is already over.
	const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' });
	await page.goto(`/book?date=${yesterday}`);
	await page.getByLabel('Time').selectOption('09:00');
	await page.getByLabel('Your name').fill('Chidi');
	await page.getByLabel('Phone number').fill('08031110004');
	await page.getByRole('button', { name: 'Book' }).click();
	await expect(page.getByText('That time is already over. Choose a later time.')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Booked' })).toHaveCount(0);
});
