<script>
	let { user } = $props();
</script>

<header class="bg-gray-900 text-white">
	<nav class="mx-auto flex max-w-5xl flex-wrap gap-4 px-4 py-4">
		<a href="/" class="text-xl font-bold">Bisi's Salon</a>
		<a href="/book" class="underline">Book</a>
		{#if user !== undefined}
			<a href="/day" class="underline">Today's bookings</a>
			<form method="POST" action="/logout"><button class="underline">Log out</button></form>
		{:else}
			<a href="/login" class="underline">Mrs Bisi: log in</a>
		{/if}
	</nav>
</header>
