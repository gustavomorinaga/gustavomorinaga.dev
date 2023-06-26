<script lang="ts">
	import { fade } from 'svelte/transition';
	import { CubeLoader } from '$lib/components';
	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';
	import { GPU } from '$lib/stores';

	export let finished = $GPU.isLowEnd || false;
	export let readMode: boolean;

	$: loading = !$GPU.isLowEnd && !finished;
</script>

{#if loading}
	<div
		class="loader"
		transition:fade|global
		style="--hexagons-pattern: url({IMAGES_SVG.bgHexagons})"
	>
		<CubeLoader />
	</div>
{/if}

<div
	class="background__container"
	class:read__mode={readMode}
	class:plain={!$GPU.isThree}
	style="--universe: url({IMAGES_WEBP.universe});"
>
	{#if $GPU.isThree}
		{#await Promise.all( [import('@threlte/core'), import('./synthwave')] ) then [{ Canvas }, { Synthwave }]}
			<Canvas>
				<Synthwave bind:finished bind:readMode />
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
			@apply absolute inset-0 z-0 block bg-black opacity-80 transition ease-out duration-300;
		}

		&.read__mode {
			@apply after:bg-zinc-950 after:opacity-100;
		}

		&.plain {
			@apply bg-none;
		}
	}
</style>
