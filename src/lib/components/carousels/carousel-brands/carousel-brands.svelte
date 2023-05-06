<script lang="ts">
	import { onMount } from 'svelte';

	let slidesRef: HTMLElement;

	export let speed = 5000;
	export let reverse = false;
	let numberSlides = 0;

	onMount(() => {
		numberSlides = slidesRef?.children?.length;
	});
</script>

<div
	class="carousel"
	class:reverse
	style="--num-slides: {numberSlides * 0.5}; --speed: {speed * 0.01}s;"
>
	<div bind:this={slidesRef} class="carousel__wrapper">
		<slot name="slides" />
		<slot name="slides" />
	</div>
</div>

<style lang="scss" global>
	.carousel {
		@apply relative overflow-hidden w-full h-fit py-4;

		& .carousel__wrapper {
			@apply flex gap-20 w-full h-fit;
			animation: scroll var(--speed) linear infinite;
		}

		&.reverse {
			& .carousel__wrapper {
				animation: scroll-reverse var(--speed) linear infinite;
			}
		}
	}

	@keyframes scroll {
		0% {
			transform: translateX(calc(-9rem * var(--num-slides)));
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes scroll-reverse {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-9rem * var(--num-slides)));
		}
	}
</style>
