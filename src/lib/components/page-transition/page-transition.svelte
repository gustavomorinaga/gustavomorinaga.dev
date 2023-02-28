<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/utils';
	import { blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let trigger: any;
	export let effect = blur;
	export let duration = 500;

	let animations = true;

	onMount(() => {
		animations = !prefersReducedMotion || window.matchMedia('(max-width: 640px)').matches;
	});
</script>

{#if animations}
	{#key trigger}
		<div
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
