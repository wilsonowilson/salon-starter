<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Bisi's Salon</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-8">
	<h1 class="text-2xl font-bold">{page.status}</h1>
	<p class="mt-2">{page.error.message}</p>
	<a href="/" class="mt-6 inline-block underline">Back to the home page</a>
</main>
