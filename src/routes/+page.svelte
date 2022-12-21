<script>
	import { Button } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Flowbite-Svelte</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid place-items-center h-screen">
	<Button on:click={() => console.log('Hello!')}>Hello!</Button>
</section>
