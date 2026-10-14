<script>
	import { showDay } from '#lib/moments.js';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Book a style | Bisi's Salon</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<h1 class="text-2xl font-bold">Book a style</h1>

	<form class="mt-4 flex items-end gap-2">
		<label>
			<span class="text-gray-700">Day</span>
			<input type="date" name="date" value={data.date} class="mt-1 block rounded border border-gray-300 p-2" />
		</label>
		<button class="rounded border border-gray-300 px-3 py-2">Show free slots</button>
	</form>

	{#if data.date !== ''}
		<h2 class="mt-6 text-xl font-semibold">Free slots on {showDay(new Date(`${data.date}T00:00:00+01:00`))}</h2>

		<p class="mt-2 flex flex-wrap gap-2">
			{#each data.freeSlots as time}
				<span class="rounded bg-green-100 px-2 py-1 text-sm text-green-900">{time}</span>
			{/each}
		</p>

		{#if data.freeSlots.length === 0}
			<p class="mt-2 text-gray-600">No free slots on this day. Choose another day.</p>
		{:else}
			<form method="POST" class="mt-4 flex flex-col gap-4">
				<input type="hidden" name="date" value={data.date} />

				<label>
					<span class="text-gray-700">Style</span>
					<select name="styleId" class="mt-1 block w-full rounded border border-gray-300 p-2">
						{#each data.styles as style}
							<option value={String(style.id)}>{style.name}</option>
						{/each}
					</select>
				</label>

				<label>
					<span class="text-gray-700">Time</span>
					<select name="time" class="mt-1 block w-full rounded border border-gray-300 p-2">
						{#each data.freeSlots as time}
							<option value={time}>{time}</option>
						{/each}
					</select>
				</label>
				{#if form?.errors?.time !== undefined}
					<p class="text-sm text-red-700">{form.errors.time}</p>
				{/if}

				<label>
					<span class="text-gray-700">Your name</span>
					<input name="customerName" value={form?.values?.customerName} class="mt-1 block w-full rounded border border-gray-300 p-2" />
				</label>
				{#if form?.errors?.customerName !== undefined}
					<p class="text-sm text-red-700">{form.errors.customerName}</p>
				{/if}

				<label>
					<span class="text-gray-700">Phone number</span>
					<input name="phone" type="tel" value={form?.values?.phone} class="mt-1 block w-full rounded border border-gray-300 p-2" />
				</label>
				{#if form?.errors?.phone !== undefined}
					<p class="text-sm text-red-700">{form.errors.phone}</p>
				{/if}

				<button class="rounded bg-gray-900 px-4 py-2 font-semibold text-white">Book</button>
			</form>
		{/if}
	{/if}
</main>
