<script lang="ts">
	import { Icon } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { containerElement, scrollToTop } from '$lib/utils';

	let scrollTopButtonRef: HTMLButtonElement;
	let MINIMUM_OFFSET = 200;

	const handleOnScroll = () => {
		const { scrollTop } = containerElement as HTMLElement;

		if (scrollTop > MINIMUM_OFFSET) scrollTopButtonRef.classList.add('show');
		else scrollTopButtonRef.classList.remove('show');
	};
</script>

<svelte:window on:scroll={handleOnScroll} />

<button
	bind:this={scrollTopButtonRef}
	id="btn-scroll-top"
	title={$LANG.scrollTop}
	aria-label={$LANG.scrollTop}
	on:click={scrollToTop}
>
	<Icon icon="arrow-big-up-lines" />
</button>

<style lang="scss" global>
	#btn-scroll-top {
		@apply fixed z-40 right-0 md:right-8 bottom-36 btn rounded-l-full md:btn-circle text-shadow-md shadow-black opacity-0 outline outline-black pointer-events-none transition-opacity duration-300 ease-out;

		&.show {
			@apply opacity-100 pointer-events-auto;
		}
	}
</style>
