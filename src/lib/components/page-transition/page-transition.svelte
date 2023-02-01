<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/utils';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let trigger: string | boolean | number;
	export let effect = blur;
	export let duration = 500;

	let animations = true;

	onMount(() => {
		animations = !prefersReducedMotion;
	});
</script>

<div class="transition">
	{#if animations}
		{#key trigger}
			<div
				in:effect={{ duration, delay: duration, easing: quintOut }}
				out:effect={{ duration, easing: quintOut }}
			>
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
