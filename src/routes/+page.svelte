<script lang="ts">
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Carousel, Icon, Metadata } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';
	import { animateOnScroll, scrollIntoView } from '$lib/utils';
	import { intersect } from '@svelte-put/intersect';
	import Atropos from 'atropos/svelte';

	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';

	const baseURL = PUBLIC_DOMAIN;

	$: services = [
		{
			icon: IMAGES_SVG.iconNib,
			title: $LANG.home.services.cardDesign.title,
			description: $LANG.home.services.cardDesign.paragraph,
			alt: $LANG.home.services.cardDesign.alt
		},
		{
			icon: IMAGES_SVG.iconCode,
			title: $LANG.home.services.cardDev.title,
			description: $LANG.home.services.cardDev.paragraph,
			alt: $LANG.home.services.cardDev.alt
		},
		{
			icon: IMAGES_SVG.iconSEO,
			title: $LANG.home.services.cardSeo.title,
			description: $LANG.home.services.cardSeo.paragraph,
			alt: $LANG.home.services.cardSeo.alt
		},
		{
			icon: IMAGES_SVG.iconMagic,
			title: $LANG.home.services.cardMotion.title,
			description: $LANG.home.services.cardMotion.paragraph,
			alt: $LANG.home.services.cardMotion.alt
		}
	];
</script>

<Metadata />

<section id="blurb">
	<div class="blurb__wrapper" use:intersect={{ threshold: 0.5 }} on:intersect={animateOnScroll}>
		<div
			class="blurb__image"
			style="--triangle: url({IMAGES_SVG.polyTriangle}); --profile-cropped: url({IMAGES_WEBP.profileCropped});"
			in:fade={{ delay: 2000, easing: cubicOut }}
		>
			<div class="mobile__profile">
				<figure class="triangle" />
				<figure class="profile" />
			</div>

			<Atropos class="atropos__profile">
				<figure class="triangle" data-atropos-offset="0" />
				<figure class="profile" data-atropos-offset="0" />

				<div
					class="popup top-10 left-12 before:from-primary before:to-black"
					data-atropos-offset="14"
				>
					<div class="popup__content">
						<span class="emoji">👨‍💻</span>
						<span class="skill">{$LANG.home.blurb.skillDev}</span>
					</div>
				</div>
				<div
					class="popup top-72 left-0 before:from-secondary before:to-black"
					data-atropos-offset="16"
				>
					<div class="popup__content">
						<span class="emoji">👨‍🎨</span>
						<span class="skill">{$LANG.home.blurb.skillDesign}</span>
					</div>
				</div>
				<div
					class="popup bottom-0 right-10 before:from-accent before:to-black"
					data-atropos-offset="20"
				>
					<div class="popup__content">
						<span class="emoji">✨</span>
						<span class="skill">{$LANG.home.blurb.skillExp}</span>
					</div>
				</div>
			</Atropos>
		</div>

		<div class="blurb__content">
			<code>profile<span class="method">.welcome()</span>;</code>

			<h1 in:fly={{ x: -150, duration: 1000, delay: 2000, easing: cubicOut }}>
				{$LANG.home.blurb.title}
				<span class="name">Gustavo Morinaga</span>
			</h1>

			<p in:fly={{ x: -200, duration: 1000, delay: 2050, easing: cubicOut }}>
				{$LANG.home.blurb.paragraph}
			</p>

			<ul class="socials" in:fly={{ x: -250, duration: 1000, delay: 2100, easing: cubicOut }}>
				{#each profileJSON.social as socialLink, index}
					<li class="social" class:cta={index === 0} data-tip={socialLink.title}>
						<a
							class="btn__social"
							href={socialLink.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={socialLink.title}
						>
							<Icon icon={socialLink.icon} />

							{index === 0 ? socialLink.title : ''}
						</a>
					</li>
				{/each}

				<li class="social" data-tip={$LANG.curriculum.title}>
					<a
						class="btn__social"
						href={`${baseURL}/files/pdfs/curriculum-${$LANG.code}.pdf`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={$LANG.curriculum.title}
					>
						<Icon icon="file-info" />
					</a>
				</li>
			</ul>
		</div>
	</div>

	<a class="scroll__to" href="#about" on:click|preventDefault={scrollIntoView}>
		<Icon icon="chevrons-down" size="lg" />
	</a>
</section>

<section id="about">
	<article class="about__card" use:intersect={{ threshold: 0.5 }} on:intersect={animateOnScroll}>
		<figure style="--profile: url({IMAGES_WEBP.profile})" />

		<div class="card-body">
			<h2>{$LANG.home.about.title}</h2>

			<h3>{$LANG.home.about.subtitle}</h3>

			<p>{$LANG.home.about.paragraph}</p>

			<blockquote cite="https://www.pensador.com/autor/david_ribeiro_guilherme">
				<p>"{$LANG.home.about.quote}"</p>

				<footer>
					<cite title="Pensador">
						<a
							href="https://www.pensador.com/autor/david_ribeiro_guilherme"
							target="_blank"
							rel="noopener noreferrer"
						>
							David Ribeiro Guilherme
						</a>
					</cite>
				</footer>
			</blockquote>

			<div class="card-actions">
				<a href="/about" class="cta">
					{$LANG.home.about.moreDetails}

					<Icon icon="chevron-right" />
				</a>
			</div>
		</div>
	</article>

	<a class="scroll__to" href="#knowledge" on:click|preventDefault={scrollIntoView}>
		<Icon icon="chevrons-down" size="lg" />
	</a>
</section>

<section id="knowledge">
	<div
		class="knowledge__content"
		style="--low-poly-grid: url({IMAGES_SVG.bgLowPolyGrid})"
		use:intersect={{ threshold: 0.5 }}
		on:intersect={animateOnScroll}
	>
		<h2>{$LANG.home.knowledge.title}</h2>

		<p>{$LANG.home.knowledge.paragraph}</p>

		<Carousel speed={7500}>
			<svelte:fragment slot="slides">
				{#each profileJSON.knowledge.techs as tech}
					<a
						class="knowledge"
						style="--icon-color: {tech.color}"
						href={tech.url}
						title={tech.title}
						aria-label={tech.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon collection={tech.collection} icon={tech.icon} size="xl" />
					</a>
				{/each}
			</svelte:fragment>
		</Carousel>

		<Carousel speed={7500} reverse>
			<svelte:fragment slot="slides">
				{#each profileJSON.knowledge.tools as tool}
					<a
						class="knowledge"
						style="--icon-color: {tool.color}"
						href={tool.url}
						title={tool.title}
						aria-label={tool.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon collection={tool.collection} icon={tool.icon} size="xl" />
					</a>
				{/each}
			</svelte:fragment>
		</Carousel>

		<a class="cta" href="/about/knowledge">
			{$LANG.home.knowledge.moreDetails}

			<Icon icon="chevron-right" />
		</a>
	</div>

	<a class="scroll__to" href="#services" on:click|preventDefault={scrollIntoView}>
		<Icon icon="chevrons-down" size="lg" />
	</a>
</section>

<section id="services">
	<div class="services__content" use:intersect={{ threshold: 0.5 }} on:intersect={animateOnScroll}>
		<h2>{$LANG.home.services.title}</h2>

		<ul class="services__list">
			{#each services as service, index}
				<li
					style="--order: {index + 1};"
					use:intersect={{ threshold: 0.5 }}
					on:intersect={animateOnScroll}
				>
					<article class="service">
						<figure>
							<img src={service.icon} alt={service.alt} width="64" height="64" loading="lazy" />
						</figure>

						<div class="card-body">
							<h3>{service.title}</h3>

							<p>{service.description}</p>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss" global>
	section#blurb {
		@apply relative hero h-gutter-header -mt-4;
		place-items: flex-start center;

		@media (min-width: 640px) {
			place-items: center;
		}

		& .blurb__wrapper {
			@apply hero-content flex-col md:flex-row-reverse items-start md:items-center gap-8 md:-mt-16 px-0 text-left;

			& .blurb__image {
				@apply md:my-0;
			}

			& .blurb__content {
				@apply relative before:absolute before:-z-10 before:inset-0 before:rounded-full before:bg-black/50 before:blur-xl;

				& h1 {
					@apply flex flex-col text-3xl md:text-5xl font-futuristic md:leading-tight text-shadow-rgb mb-8;

					& .name {
						@apply underline underline-offset-[7px];
					}
				}

				& p {
					@apply text-xl mb-12 md:mb-16;
				}

				& .socials {
					@apply flex gap-2 items-center flex-wrap;

					& .social {
						@apply w-full md:w-fit;

						&.cta {
							@apply flex-grow md:flex-grow-0 mr-0 md:mr-3;

							& .btn__social {
								@apply btn-block md:w-36 shadow-md shadow-black lg:hover:shadow-lg;
							}
						}

						&:not(.cta) {
							@apply md:tooltip md:tooltip-bottom flex-1 md:flex-initial mt-2 md:mt-0;

							& .btn__social {
								@apply btn-link btn-sm text-shadow-md shadow-black;
							}
						}
					}

					& .btn__social {
						@apply btn btn-primary gap-2 lg:hover:-translate-y-1;
					}
				}
			}
		}
	}

	.mobile__profile,
	.atropos__profile {
		@media (hover: hover) {
			&:hover {
				& .profile {
					@apply grayscale-0;

					&:after {
						@apply animate-glitch opacity-50;
					}
				}
			}
		}

		& .triangle {
			@apply absolute inset-0 bg-cover bg-no-repeat text-primary text-opacity-40 drop-shadow-md;
			background-image: var(--triangle);
		}

		& .profile {
			@apply relative z-auto w-96 h-96 bg-cover bg-no-repeat drop-shadow-md shadow-red-500 grayscale;
			background-image: var(--profile-cropped);
			clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);

			&:after {
				content: '';
				@apply absolute inset-0 w-full h-full bg-cover bg-no-repeat drop-shadow-md opacity-0 mix-blend-hard-light transition-opacity ease-out;
				background-image: var(--profile-cropped);
				clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);
			}
		}
	}

	.mobile__profile {
		@apply block lg:hidden;

		& .triangle {
			@apply inset-auto w-40 md:w-52 h-40 md:h-52;
		}

		& .profile {
			@apply w-40 md:w-52 h-40 md:h-52;
		}
	}

	.atropos__profile {
		@apply hidden lg:block w-fit h-fit p-2 pointer-events-none md:pointer-events-auto;

		@media (min-width: 1024px) {
			display: block !important;
		}

		@media (hover: hover) {
			&:hover {
				& .popup {
					@apply before:animate-spin-background before:shadow-lg animate-none;

					& .popup__content {
						& .skill {
							@apply max-w-fit ml-1 opacity-100;
						}
					}
				}

				& .atropos-shadow {
					opacity: 0.25 !important;
				}
			}
		}

		& .popup {
			@apply absolute z-10 w-fit h-fit p-px overflow-hidden shadow-sm shadow-black animate-float;

			&::before {
				content: '';
				@apply absolute -z-10 -inset-10 bg-gradient-conic bg-no-repeat;
				background-size: 50% 50%, 50% 50%;
				background-position: 0 0, 100% 0, 100% 100%, 0 100%;
			}

			& .popup__content {
				@apply inline-flex p-2 w-fit h-fit bg-black text-sm text-center overflow-hidden whitespace-nowrap;

				& .skill {
					@apply block max-w-0 opacity-0 transition-all duration-200 ease-out;
				}
			}
		}

		& .atropos-inner {
			@apply overflow-visible;
		}
		& .atropos-highlight {
			@apply hidden;
		}
		& .atropos-shadow {
			@apply w-[90%] h-[90%];
		}
	}

	section#about {
		@apply relative grid place-items-center min-h-screen;

		& .about__card {
			@apply card card-side card-bordered items-center w-full h-fit bg-base-100/50 backdrop-blur-md shadow-lg shadow-black;

			& > figure {
				@apply relative hidden md:block w-60 h-[26rem] m-4 overflow-hidden rounded-sm bg-cover bg-no-repeat lg:hover:after:max-h-full lg:hover:after:border-b-2 lg:hover:after:border-primary;
				background-image: var(--profile);

				&::before {
					content: '';
					@apply hidden lg:block absolute inset-0 z-10 backdrop-grayscale;
				}

				&::after {
					content: '';
					@apply hidden lg:block absolute inset-0 z-20 max-h-0 bg-cover bg-no-repeat border-b-0 border-transparent backdrop-grayscale transition-all duration-1000 ease-smooth;
					background-image: var(--profile);
				}
			}

			& .card-body {
				@apply max-w-lg lg:max-w-2xl mr-auto p-4;

				& h2 {
					@apply mb-2 text-4xl font-futuristic text-shadow-rgb;
				}

				& h3 {
					@apply mb-4 text-xl;
				}

				& blockquote {
					@apply mt-2 pl-2 italic border-l-2 border-primary;

					& footer {
						& cite {
							@apply link-primary link-hover text-sm not-italic;
						}
					}
				}

				& .card-actions {
					@apply mt-8;

					& .cta {
						@apply btn btn-primary btn-block md:btn-wide;

						@media (hover: hover) {
							&:hover {
								& .icon {
									@apply translate-x-1;
								}
							}
						}

						& .icon {
							@apply transition-transform duration-300 ease-out;
						}
					}
				}
			}
		}
	}

	section#knowledge {
		@apply relative grid place-items-center min-h-screen;

		& .knowledge__content {
			@apply absolute w-screen py-8 text-center bg-base-300 bg-cover bg-no-repeat bg-center bg-fixed bg-blend-hard-light border-y border-base-200 shadow-2xl shadow-black;
			background-image: var(--low-poly-grid);

			& h2 {
				@apply text-2xl md:text-4xl font-futuristic mb-4 text-shadow-rgb;
			}

			& p {
				@apply text-xl mb-4 px-4 md:px-0 text-shadow-md shadow-black;
			}

			& .knowledge {
				@apply grid place-items-center w-full h-full text-zinc-400 lg:hover:text-[var(--icon-color)] drop-shadow-lg lg:hover:scale-110 grayscale lg:hover:grayscale-0 ease-smooth;
				transition: all 0.5s ease, opacity 0.5s, transform 1s, filter 1s;

				@media (hover: hover) {
					&:hover {
						@apply z-10;

						& .icon {
							&::before {
								@apply opacity-5;
							}
						}
					}
				}

				& .icon {
					@apply relative;

					&::before {
						content: '';
						@apply absolute inset-3 block bg-white rounded-full blur-sm opacity-0 transition-opacity duration-700 ease-smooth;
					}
				}
			}

			& .cta {
				@apply btn btn-primary w-4/5 md:btn-wide mt-8;

				@media (hover: hover) {
					&:hover {
						& .icon {
							@apply translate-x-1;
						}
					}
				}

				& .icon {
					@apply transition-transform duration-300 ease-out;
				}
			}
		}
	}

	section#services {
		@apply relative grid place-items-center min-h-[75vh];

		& .services__content {
			@apply mt-24 -mb-16 md:mt-0;

			& h2 {
				@apply mb-8 text-4xl text-center font-futuristic text-shadow-rgb;
			}

			& .services__list {
				@apply grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8;

				& li {
					@apply transform-none;

					& .service {
						@apply card card-bordered bg-base-100/50 lg:hover:border-primary backdrop-blur-md shadow-lg shadow-black lg:hover:shadow-glow lg:hover:shadow-primary/10 transition duration-700 ease-smooth;
						transform: perspective(var(--perspective)) rotateY(var(--rotate-y))
							translateX(var(--translate-x));

						--perspective: 1000px;

						& figure {
							@apply w-16 h-16 mt-8 mx-8 aspect-square;

							& > img {
								@apply drop-shadow-sm shadow-primary;
							}
						}

						& h3 {
							@apply text-2xl font-futuristic text-shadow-glow shadow-primary;
						}
					}

					@media (min-width: 640px) and (hover: hover) {
						&:hover .service {
							@apply z-20;
							transform: perspective(var(--perspective)) rotateY(var(--rotate-y-hover))
								translateX(var(--translate-x-hover)) scale(var(--scale));
						}

						&:nth-child(1) .service {
							--rotate-y: 3deg;
							--rotate-y-lg:hover: 1deg;
							--translate-x: 0.75rem;
							--translate-x-lg:hover: 0.25rem;
							--scale: 1.025;

							transform-origin: left bottom;
						}
						&:nth-child(2) .service {
							--rotate-y: -3deg;
							--rotate-y-lg:hover: -1deg;
							--translate-x: -0.75rem;
							--translate-x-lg:hover: -0.25rem;
							--scale: 1.025;

							transform-origin: right bottom;
						}
						&:nth-child(3) .service {
							--rotate-y: 3deg;
							--rotate-y-lg:hover: 1deg;
							--translate-x: 0.75rem;
							--translate-x-lg:hover: 0.25rem;
							--scale: 1.025;

							transform-origin: left top;
						}
						&:nth-child(4) .service {
							--rotate-y: -3deg;
							--rotate-y-lg:hover: -1deg;
							--translate-x: -0.75rem;
							--translate-x-lg:hover: -0.25rem;
							--scale: 1.025;

							transform-origin: right top;
						}
					}
				}
			}
		}
	}

	.scroll__to {
		@apply absolute bottom-8 drop-shadow-md animate-bounce text-shadow-md shadow-black;
	}

	html.low__end {
		& #about {
			& .about__card {
				@apply backdrop-blur-none;
			}
		}

		& #knowledge {
			& .knowledge__content {
				@apply bg-none bg-base-100;
			}
		}

		& #services {
			& .services__list {
				& .service {
					@apply transform-none lg:hover:transform-none;
				}
			}
		}
	}
</style>
