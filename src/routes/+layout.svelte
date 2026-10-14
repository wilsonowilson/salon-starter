<script>
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/Header.svelte';
	import Footer from '#lib/Footer.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header user={data.user} />

{@render children()}

<Footer />
