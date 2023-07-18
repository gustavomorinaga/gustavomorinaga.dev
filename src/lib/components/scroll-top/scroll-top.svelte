<script lang="ts">
	import { Icon } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { containerElement, scrollToTop } from '$lib/utils';
	import Portal from 'svelte-portal';

	let scrollTopButtonRef: HTMLButtonElement;
	let MINIMUM_OFFSET = 200;

	const handleOnScroll = () => {
		const { scrollTop } = containerElement as HTMLElement;

		scrollTopButtonRef.classList.toggle('show', scrollTop > MINIMUM_OFFSET);
	};
</script>

<svelte:window on:scroll={handleOnScroll} />

<Portal>
	<button
		bind:this={scrollTopButtonRef}
		id="btn-scroll-top"
		title={$LANG.scrollTop}
		aria-label={$LANG.scrollTop}
		on:click={scrollToTop}
	>
		<Icon icon="arrow-big-up-lines" />
	</button>
</Portal>

<style lang="scss" global>
	button#btn-scroll-top {
		@apply btn btn-sm pointer-events-none fixed bottom-40 right-0 z-30 rounded-l-full opacity-0 shadow-lg outline outline-black transition-opacity duration-300
			ease-out md:btn-circle md:right-8 md:px-2 md:outline-none;

		&.show {
			@apply pointer-events-auto opacity-100;
		}
	}
</style>
