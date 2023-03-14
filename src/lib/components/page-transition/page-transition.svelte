<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, scrollToTop } from '$lib/utils';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { GPU } from '$lib/stores';

	export let isMain = false;
	export let trigger: any;
	export let effect = blur;
	export let duration = 500;
	export let animate = true;

	$: if (isMain && trigger) setTimeout(() => scrollToTop({ static: true }), duration);

	onMount(() => {
		animate = !prefersReducedMotion || !$GPU.isLowEnd;
	});
</script>

{#if animate}
	{#key trigger}
		<div
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
