<script lang="ts">
	import { Icon } from '$lib/components';
	import { containerElement, scrollToTop } from '$lib/utils';

	let scrollTopButtonRef: HTMLButtonElement;

	const handleOnScroll = () => {
		if ((containerElement as HTMLElement).scrollTop > 100) scrollTopButtonRef.classList.add('show');
		else scrollTopButtonRef.classList.remove('show');
	};
</script>

<svelte:window on:scroll={handleOnScroll} />

<button
	bind:this={scrollTopButtonRef}
	id="btn-scroll-top"
	title="Scroll to top"
	on:click={scrollToTop}
>
	<Icon icon="arrow-big-up-lines" />
</button>

<style lang="scss" global>
	#btn-scroll-top {
		@apply fixed z-40 right-8 bottom-28 btn btn-ghost btn-circle text-shadow-md shadow-black opacity-0 pointer-events-none transition-opacity duration-300 ease-out;

		&.show {
			@apply opacity-100 pointer-events-auto;
		}
	}
</style>
