<script>
	import Background from '$lib/components/Background.svelte';
</script>

<svelte:head>
	<title>Flowbite-Svelte</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<Background />
</main>

<style lang="scss">
	main {
		@apply grid place-items-center h-screen;
	}
</style>
