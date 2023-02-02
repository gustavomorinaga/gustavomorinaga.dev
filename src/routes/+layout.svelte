<script lang="ts">
	import '../app.scss';
	import '@fontsource/caveat';
	import '@fontsource/righteous';
	import '@fontsource/orbitron';
	import { dev } from '$app/environment';
	import {
		Background,
		Header,
		Partytown,
		Player,
		ScrollTop,
		PageTransition,
		Vitals
	} from '$lib/components';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let isThree!: boolean;
	let finished!: boolean;

	$: showContent = isThree ? finished : true;
	$: readMode = ['/blog'].includes(data.pathname);
</script>

<Partytown />
<Vitals />

<Background bind:isThree bind:finished bind:readMode />

{#if showContent}
	<Header />

	<main>
		<PageTransition trigger={data.pathname}>
			<slot />
		</PageTransition>
	</main>

	<ScrollTop />

	<Player playlist={data.playlist.data} />
{/if}

<style lang="scss">
	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto;
	}
</style>
