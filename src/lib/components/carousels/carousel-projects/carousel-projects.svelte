<script lang="ts">
	import { onMount } from 'svelte';
	import { Icon } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { balancer } from 'svelte-action-balancer';
	import { register } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper';
	import type { IProject } from '$lib/ts';

	let swiperRef: HTMLElement & { initialize: () => void };

	const SWIPER_OPTIONS: SwiperOptions = {
		navigation: true,
		effect: 'coverflow',
		slidesPerView: 1,
		centeredSlides: true,
		grabCursor: true,
		coverflowEffect: {
			depth: 100,
			modifier: 1,
			rotate: 50,
			scale: 1.05,
			slideShadows: false,
			stretch: 0
		},
		injectStyles: [
			`
			.swiper-button-prev,
			.swiper-button-next {
				display: none;
			}

			@media (min-width: 768px) {
				.swiper-button-prev,
				.swiper-button-next {
					display: flex;
				}
			}
			`
		],
		breakpoints: {
			640: {
				slidesPerView: 2
			},
			1280: {
				slidesPerView: 3
			},
			1920: {
				slidesPerView: 4
			}
		}
	};

	export let projects: IProject[] = [];

	const handleProjectAchievement = () => ACHIEVEMENTS.unlock('GMD_PROJECT');

	onMount(() => {
		register();
		Object.assign(swiperRef, SWIPER_OPTIONS);
		swiperRef.initialize();
	});
</script>

<swiper-container bind:this={swiperRef} init="false" class="projects">
	{#each projects as { title, description, previewImage, tags, repo, deploy }}
		<swiper-slide>
			<article class="project">
				<figure class="preview">
					<img src={previewImage} width="480" alt="Preview" />
				</figure>

				<div class="content">
					<div class="card-body">
						<h2>{title}</h2>
						<ul class="tags">
							{#each tags as tag}
								<li class="tag">{tag}</li>
							{/each}
						</ul>
						<p use:balancer>{description}</p>

						<div class="card-actions">
							<a
								href={deploy}
								target="_blank"
								rel="noopener noreferrer"
								on:click={handleProjectAchievement}
							>
								<Icon icon="external-link" size="sm" />
								{$LANG.projects.links.deploy}
							</a>

							<a
								href={repo}
								target="_blank"
								rel="noopener noreferrer"
								on:click={handleProjectAchievement}
							>
								<Icon icon="code" size="sm" />
								{$LANG.projects.links.code}
							</a>
						</div>
					</div>
				</div>
			</article>
		</swiper-slide>
	{/each}
</swiper-container>

<style lang="scss" global>
	swiper-container.projects {
		--swiper-navigation-color: hsl(var(--bc) / var(--tw-text-opacity));
		--swiper-navigation-sides-offset: 5vw;
		--ml-offset: 1rem;

		@apply absolute w-screen py-2 xl:py-16;
		margin-left: calc(-50vw + 50% - var(--ml-offset));

		@media (min-width: 768px) {
			--ml-offset: 0rem;
		}

		& swiper-slide {
			&.swiper-slide-active {
				& .project {
					@apply grayscale-0 brightness-100;

					& figure {
						@apply xl:scale-125 after:opacity-0;
					}

					& .content {
						@apply lg:opacity-100 lg:translate-y-0;
					}
				}
			}

			& .project {
				@apply relative grayscale-[25] brightness-75 transition duration-300 ease-out;

				& figure {
					@apply -z-10 mockup-window w-full pt-3 before:mb-3 bg-base-100 border border-base-200 shadow-lg  transition duration-300 ease-out;

					&::after {
						content: '';
						@apply absolute inset-0 bg-black opacity-50 transition duration-300 ease-out;
					}

					& img {
						@apply w-full border-t border-base-200;
					}
				}

				& .content {
					@apply card z-20 lg:-mt-12 bg-base-100 shadow-lg lg:opacity-0 lg:translate-y-16 transition duration-300 ease-out;

					& .card-body {
						& h2 {
							@apply text-xl md:text-3xl font-futuristic text-shadow-glow shadow-primary;
						}

						& .tags {
							@apply flex flex-wrap gap-1 mb-2;

							& .tag {
								@apply badge badge-sm md:badge-md;
							}
						}

						& p {
							@apply mb-4;
						}

						& .card-actions {
							@apply justify-end;

							& > a {
								@apply btn btn-outline btn-sm gap-1 border-primary text-primary lg:hover:btn-primary;
							}
						}
					}
				}
			}
		}
	}
</style>
