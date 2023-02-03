<script lang="ts">
	import '../app.scss';
	import '@fontsource/caveat';
	import '@fontsource/righteous';
	import '@fontsource/orbitron';
	import {
		Analytics,
		Background,
		Header,
		Player,
		ScrollTop,
		PageTransition,
		Footer
	} from '$lib/components';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let isThree!: boolean;
	let finished!: boolean;

	$: showContent = isThree ? finished : true;
	$: readMode = ['/blog'].includes(data.pathname);
</script>

<Analytics />

<Background bind:isThree bind:finished bind:readMode />

{#if showContent}
	<Header />

	<main>
		<PageTransition trigger={data.pathname}>
			<slot />
		</PageTransition>
	</main>

	<Player playlist={data.playlist.data} />

	<ScrollTop />

	<Footer />
{/if}

<style lang="scss">
	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto py-8;
	}
</style>
