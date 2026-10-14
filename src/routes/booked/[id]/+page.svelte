<script>
	import { showMoment } from '#lib/moments.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>Booked | Bisi's Salon</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<h1 class="text-2xl font-bold">Booked</h1>
	<p class="mt-2">{data.booking.style}, for {data.booking.customerName}</p>
	<p class="mt-1 text-lg font-semibold">{showMoment(data.booking.startsAt)}</p>
	<p class="mt-4 text-gray-600">See you at Bisi's Salon.</p>
</main>
