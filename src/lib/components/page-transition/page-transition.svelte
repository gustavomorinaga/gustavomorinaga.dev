<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, scrollToTop } from '$lib/utils';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { GPU } from '$lib/stores';

	export let ref: HTMLElement | null = null;
	export let goTop = false;
	export let trigger: any;
	export let effect = blur;
	export let duration = 500;
	export let animate = true;

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
			in:effect|local={{ duration, delay: duration, easing: quintOut }}
			out:effect|local={{ duration, easing: quintOut }}
		>
			<slot />
		</div>
	{/key}
{:else}
	<slot />
{/if}

<style lang="scss">
	div.page__transition {
		@apply block w-full h-full;
	}
</style>
