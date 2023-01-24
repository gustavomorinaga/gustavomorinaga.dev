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

{#if animations}
	{#key $page.url.pathname}
		<div class="transition" in:effect={{ duration, easing: quintOut }}>
			<slot />
		</div>
	{/key}
{:else}
	<slot />
{/if}

<style lang="scss">
	.transition {
		@apply absolute inset-0 block py-4 origin-center;
	}
</style>
