<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, scrollToTop } from '$lib/utils';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { GPU } from '$lib/stores';

	export let ref: HTMLElement | null = null;
	export let goTop = false;
	export let animate = true;
	export let trigger: any;
	export let effect = blur;
	export let duration = 500;

	$: if (goTop && trigger) setTimeout(() => scrollToTop({ static: true }), duration);

	onMount(() => {
		animate = !prefersReducedMotion || !$GPU.isLowEnd;
	});
</script>

{#if animate}
	{#key trigger}
		<div
			bind:this={ref}
			class="page__transition"
			in:effect={{ duration, delay: duration, easing: quintOut }}
			out:effect={{ duration, easing: quintOut }}
		>
			<slot />
		</div>
	{/key}
{:else}
	<slot />
{/if}

<style lang="scss">
	div.page__transition {
		@apply block h-full w-full;
	}
</style>
