<!-- Transition.svelte -->
<script>
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	export let refresh = '/';

	let animations = false;

	onMount(() => {
		animations = window.matchMedia('(prefers-reduced-motion: reduce)').matches !== true;
	});
</script>

{#key refresh}
	{#if !!animations}
		<div
			class="transition"
			in:blur={{ duration: 300, easing: cubicOut }}
			out:blur={{ duration: 300, easing: cubicIn }}
		>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
{/key}
