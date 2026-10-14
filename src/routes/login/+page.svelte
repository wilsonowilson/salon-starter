<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Log in | Bisi's Salon</title>
</svelte:head>

<main class="mx-auto max-w-sm px-4 py-8">
	<h1 class="text-2xl font-bold">Log in</h1>
	<p class="mt-1 text-gray-600">For Mrs Bisi, to see the day's bookings.</p>

	<form method="POST" use:enhance class="mt-6 flex flex-col gap-4">
		<label>
			<span class="text-gray-700">Email</span>
			<input name="email" type="email" value={form?.email ?? ''} class="mt-1 block w-full rounded border border-gray-300 p-2" />
		</label>
		<label>
			<span class="text-gray-700">Password</span>
			<input name="password" type="password" class="mt-1 block w-full rounded border border-gray-300 p-2" />
		</label>
		{#if form?.message !== undefined}
			<p class="text-sm text-red-700">{form.message}</p>
		{/if}
		<button class="rounded bg-gray-900 px-4 py-2 font-semibold text-white">Log in</button>
	</form>
</main>
