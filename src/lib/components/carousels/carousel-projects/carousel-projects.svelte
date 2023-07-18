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
					@apply brightness-100 grayscale-0;

					& figure {
						@apply after:opacity-0 xl:scale-125;
					}

					& .content {
						@apply lg:translate-y-0 lg:opacity-100;
					}
				}
			}

			& article.project {
				@apply relative brightness-75 grayscale-[25] transition duration-300 ease-out;

				& figure {
					@apply mockup-window pointer-events-none -z-10 w-full border border-base-200 bg-base-100 pt-3 shadow-lg transition duration-300 ease-out before:mb-3;

					&::after {
						content: '';
						@apply absolute inset-0 bg-black opacity-50 transition duration-300 ease-out;
					}

					& img {
						@apply w-full border-t border-base-200;
					}
				}

				& div.content {
					@apply card z-20 bg-base-100 shadow-lg transition duration-300 ease-out lg:-mt-12 lg:translate-y-16 lg:opacity-0;

					& .card-body {
						& h2 {
							@apply font-futuristic text-xl shadow-primary text-shadow-glow md:text-3xl;
						}

						& .tags {
							@apply mb-2 flex flex-wrap gap-1;

							& .tag {
								@apply badge badge-neutral badge-sm md:badge-md;
							}
						}

						& p {
							@apply mb-4;
						}

						& .card-actions {
							@apply justify-end;

							& > a {
								@apply btn btn-outline btn-sm gap-1 border-base-200 text-primary
									hover:border-base-200 hover:bg-primary/10 hover:text-primary;
							}
						}
					}
				}
			}
		}
	}
</style>
