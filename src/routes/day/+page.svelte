<script>
	import { showTime } from '#lib/moments.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>The day's bookings | Bisi's Salon</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<h1 class="text-2xl font-bold">Bookings for {data.dayName}</h1>

	<form class="mt-4 flex items-end gap-2">
		<label>
			<span class="text-gray-700">Day</span>
			<input type="date" name="date" class="mt-1 block rounded border border-gray-300 p-2" />
		</label>
		<button class="rounded border border-gray-300 px-3 py-2">Show</button>
	</form>

	{#each data.bookings as booking}
		<div class="mt-4 rounded-lg border border-gray-200 p-4">
			<p class="font-semibold">{showTime(booking.startsAt)}: {booking.style}</p>
			<p>{booking.customerName}, {booking.phone}</p>
		</div>
	{:else}
		<p class="mt-4 text-gray-600">No bookings on this day.</p>
	{/each}
</main>
