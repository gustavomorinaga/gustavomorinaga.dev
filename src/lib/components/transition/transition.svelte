<!-- Transition.svelte -->
<script>
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	export let refresh = '/';
	export let inTransition = blur;
	export let outTransition = blur;

	let animations = false;

	onMount(() => {
		animations = window.matchMedia('(prefers-reduced-motion: reduce)').matches !== true;
	});
</script>

{#key refresh}
	{#if !!animations}
		<div in:inTransition={{ easing: cubicOut }} out:outTransition={{ easing: cubicIn }}>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
{/key}
