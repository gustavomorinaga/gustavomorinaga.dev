<script lang="ts">
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import { CardPost } from '$lib/components';
	import type { IPost } from '$lib/ts';
	import type { SwiperOptions } from 'swiper';

	const SWIPER_OPTIONS: SwiperOptions = {
		navigation: true,
		pagination: {
			clickable: true
		},
		keyboard: true,
		slidesPerView: 1,
		autoHeight: true,
		injectStyles: [
			`
			.swiper-wrapper {
				padding-bottom: 3rem;
			}
			`
		],
		spaceBetween: 48
	};

	export let slides: IPost[] = [];

	let swiperRef: HTMLElement & { initialize: () => void };

	onMount(() => {
		register();
		Object.assign(swiperRef, SWIPER_OPTIONS);
		swiperRef.initialize();
	});
</script>

<swiper-container bind:this={swiperRef} init="false" class="featured">
	{#each slides as post (post.id)}
		<swiper-slide>
			<CardPost {post} tagLimit={3} tagSize="md" />
		</swiper-slide>
	{/each}
</swiper-container>

<style lang="scss" global>
	swiper-container.featured {
		@apply -mx-4 my-0 max-w-[100vw] md:mx-0 md:px-12;

		--swiper-navigation-size: 1.5rem;
		--swiper-navigation-top-offset: calc(50% - 1.5rem);
		--swiper-navigation-color: hsl(var(--bc) / var(--tw-text-opacity));
		--swiper-pagination-color: hsl(var(--p) / var(--tw-text-opacity));
		--swiper-pagination-bullet-width: 1rem;
		--swiper-pagination-bullet-inactive-color: hsl(var(--bc) / var(--tw-text-opacity));
		--swiper-pagination-bullet-border-radius: 0;

		& > swiper-slide {
			&:not(.swiper-slide-active) {
				@apply pointer-events-none;
			}

			& a.post {
				@apply border-x-0 md:min-h-[14rem] md:border;

				& .card-body {
					@apply px-12 md:px-8;

					& > header {
						& > h3 {
							@apply text-xl md:text-3xl;
						}
					}

					& > footer {
						& .author {
							& > figure.avatar {
								& > div {
									@apply w-10;
								}
							}

							& > div {
								@apply text-base;
							}
						}
					}
				}
			}
		}
	}
</style>
