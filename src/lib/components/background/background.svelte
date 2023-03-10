<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { CubeLoader } from '$lib/components';
	import { GPU } from '$lib/stores';
	import { containerElement } from '$lib/utils';

	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';

	export let finished = $GPU.isLowEnd || false;
	export let readMode: boolean;

	$: isThree = $GPU.isThree;
	$: isMobile = $GPU.isMobile;
	$: isLowEnd = $GPU.isLowEnd;
	$: loading = !isLowEnd && !finished;
	$: if (browser) {
		if (containerElement && finished) containerElement.classList.add('scrollbar--show');
	}

	onMount(() => {
		finished = isMobile || isLowEnd;
	});
</script>

{#if loading}
	<div class="loader" transition:fade style="--hexagons-pattern: url({IMAGES_SVG.bgHexagons})">
		<CubeLoader />
	</div>
{/if}

<div
	class="background__container"
	class:read__mode={readMode}
	class:plain={!isThree}
	style="--universe: url({IMAGES_WEBP.universe});"
>
	{#if isThree}
		{#await Promise.all( [import('@threlte/core'), import('./synthwave')] ) then [{ Canvas }, { Synthwave }]}
			<Canvas>
				<Synthwave bind:finished />
			</Canvas>
		{/await}
	{/if}
</div>

<style lang="scss" global>
	.loader {
		@apply fixed inset-0 z-[100] grid place-items-center;

		&::after {
			content: '';
			@apply absolute inset-0 -z-10 bg-base-100;
			background-image: var(--hexagons-pattern);
		}
	}

	.background__container {
		@apply fixed -z-10 inset-0 w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat;
		background-image: var(--universe);

		&::after {
			content: '';
			@apply absolute inset-0 z-0 block bg-black opacity-80 transition-opacity ease-out duration-300;
		}

		&.read__mode {
			@apply after:opacity-80;
		}

		&.plain {
			@apply bg-none;
		}
	}
</style>
