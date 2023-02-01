<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { prefersReducedMotion } from '$lib/utils';

	export let effect = blur;
	export let duration = 500;

	let animations = true;

	onMount(() => {
		animations = !prefersReducedMotion;
	});
</script>

<div class="transition">
	{#if animations}
		{#key $page.url.pathname}
			<div in:effect={{ duration, easing: quintOut }}>
				<slot />
			</div>
		{/key}
	{:else}
		<slot />
	{/if}
</div>

<style lang="scss">
	.transition {
		@apply absolute top-0 block pt-4 pb-32 origin-center;
	}
</style>
