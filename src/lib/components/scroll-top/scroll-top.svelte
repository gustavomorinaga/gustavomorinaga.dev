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
		@apply fixed z-30 right-0 md:right-8 bottom-40 btn btn-sm md:px-2 rounded-l-full md:btn-circle opacity-0 outline outline-black md:outline-none
			shadow-lg pointer-events-none transition-opacity duration-300 ease-out;

		&.show {
			@apply opacity-100 pointer-events-auto;
		}
	}
</style>
