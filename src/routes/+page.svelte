<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CarouselBrands, Icon, Metadata } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { animateOnScroll, baseURL, scrollIntoView, speakText } from '$lib/utils';
	import { intersect } from '@svelte-put/intersect';
	import { balancer } from 'svelte-action-balancer';
	import Atropos from 'atropos/svelte';

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

	const handleSpeech = () => speakText('Gustavo Morinaga', 'pt-BR');

	const handleSocialAchievement = () => ACHIEVEMENTS.unlock('GMD_SOCIAL');
</script>

<Metadata />

<section id="blurb">
	<div class="blurb__wrapper" use:intersect={{ threshold: 0.5 }} on:intersect={animateOnScroll}>
		<div
			class="blurb__image"
			style="--triangle: url({IMAGES_SVG.polyTriangle}); --profile-cropped: url({IMAGES_WEBP.profileCropped});"
			in:fade|global={{ delay: 2000, easing: cubicOut }}
		>
			<div class="mobile__profile">
				<figure class="triangle" />
				<figure class="profile" />
			</div>

			<Atropos class="atropos__profile">
				<figure class="triangle" data-atropos-offset="0" />
				<figure class="profile" data-atropos-offset="0" />

				<div
					class="popup left-12 top-10 before:from-primary before:to-black"
					data-atropos-offset="14"
				>
					<div class="popup__content">
						<span class="emoji">👨‍💻</span>
						<span class="skill">{$LANG.home.blurb.skillDev}</span>
					</div>
				</div>
				<div
					class="popup left-0 top-72 before:from-secondary before:to-black"
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
			<code class="typewriter">profile<span class="method">.welcome()</span>;</code>

			<h1 in:fly|global={{ x: -150, duration: 1000, delay: 2000, easing: cubicOut }}>
				{$LANG.home.blurb.title}
				<span class="name">
					Gustavo Morinaga

					{#if $LANG.code === 'en'}
						<button class="btn__pronounce" on:click={handleSpeech}>
							<Icon icon="volume" size="sm" />
						</button>
					{/if}
				</span>
			</h1>

			<p in:fly|global={{ x: -200, duration: 1000, delay: 2050, easing: cubicOut }}>
				{$LANG.home.blurb.paragraph}
			</p>

			<ul
				class="socials"
				in:fly|global={{ x: -250, duration: 1000, delay: 2100, easing: cubicOut }}
			>
				{#each profileJSON.social as socialLink, index}
					<li class="social" class:cta={index === 0} data-tip={socialLink.title}>
						<a
							class="btn__social"
							href={socialLink.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={socialLink.title}
							on:click={handleSocialAchievement}
						>
							<Icon icon={socialLink.icon} />

							{#if index === 0}
								{socialLink.title}
							{/if}
						</a>
					</li>
				{/each}

				<li class="social" data-tip={$LANG.resume.title}>
					<a
						class="btn__social"
						href={`${baseURL}/files/pdfs/resume-${$LANG.code}.pdf`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={$LANG.resume.title}
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
	<article
		class="about__card"
		style="--curved-lines: url({IMAGES_SVG.bgCurvedLines})"
		use:intersect={{ threshold: 0.5 }}
		on:intersect={animateOnScroll}
	>
		<figure style="--profile: url({IMAGES_WEBP.profile})" />

		<div class="card-body">
			<h2>{$LANG.home.about.title}</h2>

			<h3>{$LANG.home.about.subtitle}</h3>

			<p use:balancer>{$LANG.home.about.paragraph}</p>

			<blockquote cite="https://www.pensador.com/autor/david_ribeiro_guilherme">
				<p use:balancer>"{$LANG.home.about.quote}"</p>

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
				<a href="/about" class="cta" rel="me">
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

		<CarouselBrands speed={7500}>
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
		</CarouselBrands>

		<CarouselBrands speed={7500} reverse>
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
		</CarouselBrands>

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

							<p use:balancer>{service.description}</p>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss" global>
	@import 'atropos/scss';

	section#blurb {
		@apply hero relative -mt-4 h-gutter-header;
		place-items: flex-start center;

		@media (min-width: 640px) {
			place-items: center;
		}

		& .blurb__wrapper {
			@apply hero-content flex-col items-start gap-8 px-0 text-left md:-mt-16 md:flex-row-reverse md:items-center;

			& .blurb__image {
				@apply md:my-0;
			}

			& .blurb__content {
				@apply relative before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black/50 before:blur-xl;

				& h1 {
					@apply mb-8 flex flex-col font-futuristic text-2xl text-shadow-rgb md:text-5xl md:leading-tight;

					& .name {
						@apply relative w-fit pr-12 underline underline-offset-[7px];

						& .btn__pronounce {
							@apply btn btn-circle btn-outline btn-sm absolute right-0 top-0 w-8 border-primary p-0 text-primary hover:btn-primary;
						}
					}
				}

				& p {
					@apply mb-12 text-base md:mb-16 md:text-xl;
				}

				& .socials {
					@apply flex flex-wrap items-center gap-2;

					& .social {
						@apply grid w-full place-items-center md:w-fit;

						&.cta {
							@apply mr-0 flex-grow md:mr-3 md:flex-grow-0;

							& .btn__social {
								@apply btn-block shadow-md md:w-36 lg:hover:shadow-lg;
							}
						}

						&:not(.cta) {
							@apply mt-2 flex-1 md:tooltip md:tooltip-bottom md:mt-0 md:flex-initial;

							& .btn__social {
								@apply btn-link btn-sm px-2 drop-shadow;
							}
						}
					}

					& .btn__social {
						@apply btn btn-primary gap-2 md:hover:-translate-y-1;
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
			@apply relative z-auto h-96 w-96 bg-cover bg-no-repeat shadow-red-500 drop-shadow-md grayscale;
			background-image: var(--profile-cropped);
			clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);

			&:after {
				content: '';
				@apply absolute inset-0 h-full w-full bg-cover bg-no-repeat opacity-0 mix-blend-hard-light drop-shadow-md transition-opacity ease-out;
				background-image: var(--profile-cropped);
				clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);
			}
		}
	}

	.mobile__profile {
		@apply block lg:hidden;

		& .triangle {
			@apply inset-auto h-40 w-40 md:h-52 md:w-52;
		}

		& .profile {
			@apply h-40 w-40 md:h-52 md:w-52;
		}
	}

	.atropos__profile {
		@apply pointer-events-none hidden h-fit w-fit p-2 md:pointer-events-auto lg:block;

		@media (min-width: 1024px) {
			display: block !important;
		}

		@media (hover: hover) {
			&:hover {
				& .popup {
					@apply animate-none before:animate-spin-background before:shadow-lg;

					& .popup__content {
						& .skill {
							@apply ml-1 max-w-fit opacity-100;
						}
					}
				}

				& .atropos-shadow {
					opacity: 0.25 !important;
				}
			}
		}

		& .popup {
			@apply absolute z-10 h-fit w-fit animate-float overflow-hidden p-px  shadow-sm;

			&::before {
				content: '';
				@apply absolute -inset-10 -z-10 bg-gradient-conic bg-no-repeat;
				background-size: 50% 50%, 50% 50%;
				background-position: 0 0, 100% 0, 100% 100%, 0 100%;
			}

			& .popup__content {
				@apply inline-flex h-fit w-fit overflow-hidden whitespace-nowrap bg-black p-2 text-center text-sm;

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
			@apply h-[90%] w-[90%];
		}
	}

	section#about {
		@apply relative grid min-h-screen place-items-center;

		& .about__card {
			@apply card card-bordered card-side h-fit w-full items-center bg-base-100/75 bg-cover bg-center bg-no-repeat shadow-lg backdrop-blur-md backdrop-saturate-200;
			background-image: var(--curved-lines);

			& > figure {
				@apply rounded-box relative m-4 hidden h-[26rem] w-60 overflow-hidden bg-cover bg-no-repeat md:block lg:hover:after:max-h-full lg:hover:after:border-b-2 lg:hover:after:border-primary;
				background-image: var(--profile);

				&::before {
					content: '';
					@apply absolute inset-0 z-10 hidden backdrop-grayscale lg:block;
				}

				&::after {
					content: '';
					@apply absolute inset-0 z-20 hidden max-h-0 border-b-0 border-transparent bg-cover bg-no-repeat backdrop-grayscale transition-all duration-1000 ease-smooth lg:block;
					background-image: var(--profile);
				}
			}

			& .card-body {
				@apply mr-auto p-4 md:max-w-lg lg:max-w-2xl;

				& h2 {
					@apply mb-2 font-futuristic text-2xl text-shadow-rgb md:text-4xl;
				}

				& h3 {
					@apply mb-4 text-base text-white md:text-xl;
				}

				& blockquote {
					@apply rounded-box mt-2 overflow-hidden border-l-2 border-primary bg-gradient-to-r from-stone-950/75 to-stone-950/50 p-4 italic;

					& footer {
						& cite {
							@apply link-hover link-primary text-sm not-italic;
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
		@apply relative grid min-h-screen place-items-center;

		& .knowledge__content {
			@apply absolute w-screen border-y border-base-200 bg-base-300 bg-cover bg-fixed bg-center bg-no-repeat py-8 text-center bg-blend-hard-light shadow-2xl;
			background-image: var(--low-poly-grid);

			& h2 {
				@apply mb-4 font-futuristic text-2xl text-shadow-rgb md:text-4xl;
			}

			& p {
				@apply mb-4 px-4 text-base shadow-black text-shadow-md md:px-0 md:text-xl;
			}

			& .knowledge {
				@apply grid h-full w-full place-items-center text-zinc-400 drop-shadow-lg grayscale ease-smooth lg:hover:scale-110 lg:hover:text-[var(--icon-color)] lg:hover:grayscale-0;
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
						@apply absolute inset-3 block rounded-full bg-white opacity-0 blur-sm transition-opacity duration-700 ease-smooth;
					}
				}
			}

			& .cta {
				@apply btn btn-primary mt-8 w-4/5 md:btn-wide;

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
		@apply relative grid min-h-[75vh] place-items-center;

		& .services__content {
			@apply -mb-16 mt-24 w-full md:mt-0;

			& h2 {
				@apply mb-8 text-center font-futuristic text-2xl text-shadow-rgb md:text-4xl;
			}

			& .services__list {
				@apply grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8;

				& li {
					@apply col-auto transform-none;

					& .service {
						@apply card card-bordered h-full w-full bg-base-100/75 shadow-lg backdrop-blur-md backdrop-saturate-200 transition duration-700 ease-smooth md:hover:border-primary lg:hover:shadow-glow lg:hover:shadow-primary/10;
						transform: perspective(var(--perspective)) rotateY(var(--rotate-y))
							translateX(var(--translate-x));

						--perspective: 1000px;

						& figure {
							@apply mx-8 mt-8 aspect-square h-12 w-12 md:h-16 md:w-16;

							& > img {
								@apply shadow-primary drop-shadow-sm;
							}
						}

						& h3 {
							@apply font-futuristic text-xl shadow-primary text-shadow-glow md:text-2xl;
						}

						& p {
							@apply text-base;
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
							--translate-x: 0.75rem;
							--scale: 1.025;

							transform-origin: left bottom;
						}
						&:nth-child(2) .service {
							--rotate-y: -3deg;
							--translate-x: -0.75rem;
							--scale: 1.025;

							transform-origin: right bottom;
						}
						&:nth-child(3) .service {
							--rotate-y: 3deg;
							--translate-x: 0.75rem;
							--scale: 1.025;

							transform-origin: left top;
						}
						&:nth-child(4) .service {
							--rotate-y: -3deg;
							--translate-x: -0.75rem;
							--scale: 1.025;

							transform-origin: right top;
						}
					}
				}
			}
		}
	}

	.scroll__to {
		@apply absolute bottom-8 animate-bounce drop-shadow-md;
	}

	html.low__end {
		& section#blurb {
			& > .blurb__wrapper {
				& > .blurb__content {
					@apply before:hidden;
				}
			}
		}

		& section#about {
			& .about__card {
				@apply backdrop-blur-none backdrop-saturate-0;
			}
		}

		& section#knowledge {
			& .knowledge__content {
				@apply bg-base-100 bg-none;

				& > p {
					@apply text-shadow-[none];
				}
			}
		}

		& section#services {
			& .services__list {
				& .service {
					@apply duration-1000;
				}
			}
		}
	}
</style>
