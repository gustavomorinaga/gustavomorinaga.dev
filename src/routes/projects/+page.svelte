<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata } from '$lib/components';
	import { IMAGES_WEBP } from '$lib/images';
	import { LANG } from '$lib/stores';
	import { register } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper';

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

	$: projects = [
		{
			title: 'Portfolio',
			description: $LANG.projects.portfolio.description,
			previewImage: IMAGES_WEBP.previewPortfolio,
			repo: 'https://github.com/gustavomorinaga/portfolio',
			deploy: 'https://gustavomorinaga.dev',
			tags: ['sveltekit', 'typescript', 'vite', 'tailwindcss', 'sass']
		},
		{
			title: 'Next-Plate',
			description: $LANG.projects['next-plate'].description,
			previewImage: IMAGES_WEBP.previewNextPlate,
			repo: 'https://github.com/gustavomorinaga/next-plate',
			deploy: 'https://next-plate.vercel.app',
			tags: ['nextjs', 'typescript', 'chakraui']
		},
		{
			title: 'GitHub Unfollow Checker',
			description: $LANG.projects['github-unfollow-checker'].description,
			previewImage: IMAGES_WEBP.previewGithubUnfollowerChecker,
			repo: 'https://github.com/gustavomorinaga/github-unfollow-checker',
			deploy: 'https://github-unfollow-checker.vercel.app',
			tags: ['nextjs', 'typescript', 'tailwindcss', 'sass']
		},
		{
			title: 'HotCode',
			description: $LANG.projects.hotcode.description,
			previewImage: IMAGES_WEBP.previewHotCode,
			repo: 'https://github.com/gustavomorinaga/HotCode',
			deploy: 'https://gustavomorinaga.github.io/HotCode',
			tags: ['react', 'nodejs', 'html', 'css']
		}
	];

	onMount(() => {
		register();
		Object.assign(swiperRef, SWIPER_OPTIONS);
		swiperRef.initialize();
	});
</script>

<Metadata title={$LANG.projects.metadata.title} description={$LANG.projects.metadata.description} />

<code class="projects">profile<span class="method">.projects()</span>;</code>

<article class="projects" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.projects.title}</h1>

	<p>{@html $LANG.projects.paragraph}</p>

	<span class="motion__instruction">
		<Icon icon="arrow-narrow-left" />
		Arraste para visualizar
		<Icon icon="arrow-narrow-right" />
	</span>
	<swiper-container bind:this={swiperRef} init="false" class="carousel">
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
							<p>{description}</p>

							<div class="card-actions">
								<a href={deploy} target="_blank" rel="noopener noreferrer">
									<Icon icon="external-link" size="sm" />
									{$LANG.projects.links.deploy}
								</a>

								<a href={repo} target="_blank" rel="noopener noreferrer">
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
</article>

<style lang="scss" global>
	code.projects {
		@apply md:mt-16;
	}

	article.projects {
		@apply min-h-[80vh];

		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-8 md:mb-16;

			& > a {
				@apply link-primary link-hover;
			}
		}

		& .motion__instruction {
			@apply flex md:hidden justify-center gap-2 p-4;

			& .icon {
				@apply text-primary;
			}
		}

		& .carousel {
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
						@apply grayscale-0 brightness-100 after:opacity-0 after:xl:scale-125;

						& figure {
							@apply xl:scale-125;
						}

						& .content {
							@apply lg:opacity-100 lg:translate-y-0;
						}
					}
				}

				& .project {
					@apply relative grayscale-[25] brightness-75 transition duration-300 ease-out;

					&::after {
						content: '';
						@apply absolute inset-0 bg-black opacity-50 transition duration-300 ease-out;
					}

					& figure {
						@apply -z-10 mockup-window w-full pt-3 before:mb-3 bg-base-100 border border-base-200 shadow-lg  transition duration-300 ease-out;

						& img {
							@apply w-full border-t border-base-200;
						}
					}

					& .content {
						@apply card z-20 lg:-mt-12 bg-base-100 shadow-lg  lg:opacity-0 lg:translate-y-16 transition duration-300 ease-out;

						& .card-body {
							& h2 {
								@apply text-3xl font-futuristic text-shadow-glow shadow-primary;
							}

							& .tags {
								@apply flex flex-wrap gap-1 mb-2;

								& .tag {
									@apply badge;
								}
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
	}
</style>
