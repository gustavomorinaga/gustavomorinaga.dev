<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata } from '$lib/components';
	import { observeScroll, scrollIntoView } from '$lib/utils';
	import type { IKnowledge, ISocial } from '$lib/types';
	import Atropos from 'atropos/svelte';
	import { Autoplay, FreeMode } from 'swiper';
	import { register } from 'swiper/element';

	let techsSwiperElement: HTMLElement & { initialize: () => void };
	let toolsSwiperElement: HTMLElement & { initialize: () => void };

	const swiperOptions = {
		modules: [Autoplay, FreeMode],
		slidesPerView: 10,
		breakpoints: {
			320: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			480: {
				slidesPerView: 5,
				spaceBetween: 40
			},
			640: {
				slidesPerView: 10,
				spaceBetween: 80
			}
		},
		spaceBetween: 80,
		watchOverflow: true,
		speed: 4000,
		loop: true,
		freeMode: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			reverseDirection: false
		},
		injectStyles: [
			`
      :host(.knowledges__carousel) .swiper-wrapper {
				transition-timing-function: linear !important;
      }
      `
		]
	};

	const socialLinks: ISocial[] = [
		{
			title: 'GitHub',
			icon: 'brand-github',
			url: 'https://github.com/gustavomorinaga'
		},
		{
			title: 'LinkedIn',
			icon: 'brand-linkedin',
			url: 'https://www.linkedin.com/in/gustavomorinaga'
		},
		{
			title: 'Instagram',
			icon: 'brand-instagram',
			url: 'https://www.instagram.com/gustavomorinaga'
		},
		{
			title: 'Facebook',
			icon: 'brand-facebook',
			url: 'https://www.facebook.com/gustavomorinaga'
		},
		{
			title: 'Discord',
			icon: 'brand-discord',
			url: 'https://discordapp.com/users/373397937155473408'
		},
		{
			title: 'E-mail',
			icon: 'mail',
			url: 'mailto:gustavo.morinaga27@gmail.com'
		}
	];

	const knowledges: IKnowledge = {
		techs: [
			{
				title: 'HTML',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
				icon: 'html5',
				color: '#E34F26'
			},
			{
				title: 'CSS',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
				icon: 'css3',
				color: '#1572B6'
			},
			{
				title: 'Sass',
				url: 'https://sass-lang.com',
				icon: 'sass',
				color: '#CC6699'
			},
			{
				title: 'Tailwind CSS',
				url: 'https://tailwindcss.com',
				icon: 'tailwindcss',
				color: '#06B6D4'
			},
			{
				title: 'Bootstrap',
				url: 'https://getbootstrap.com',
				icon: 'bootstrap',
				color: '#7952B3'
			},
			{
				title: 'JavaScript',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
				icon: 'javascript',
				color: '#F7DF1E'
			},
			{
				title: 'TypeScript',
				url: 'https://www.typescriptlang.org',
				icon: 'typescript',
				color: '#3178C6'
			},
			{
				title: 'Node.js',
				url: 'https://nodejs.org',
				icon: 'nodejs',
				color: '#339933'
			},
			{
				title: 'Express',
				url: 'https://expressjs.com',
				icon: 'express',
				color: '#FFFFFF'
			},
			{
				title: 'PHP',
				url: 'https://www.php.net',
				icon: 'php',
				color: '#777BB4'
			},
			{
				title: 'MySQL',
				url: 'https://www.mysql.com',
				icon: 'mysql',
				color: '#4479A1'
			},
			{
				title: 'MongoDB',
				url: 'https://www.mongodb.com',
				icon: 'mongodb',
				color: '#47A248'
			},
			{
				title: 'Firebase',
				url: 'https://firebase.google.com',
				icon: 'firebase',
				color: '#FFCA28'
			},
			{
				title: 'React',
				url: 'https://reactjs.org',
				icon: 'react',
				color: '#61DAFB'
			},
			{
				title: 'Expo',
				url: 'https://expo.io',
				icon: 'expo',
				color: '#FFFFFF'
			},
			{
				title: 'Next.js',
				url: 'https://nextjs.org',
				icon: 'nextdotjs',
				color: '#FFFFFF'
			},
			{
				title: 'Chakra-UI',
				url: 'https://chakra-ui.com',
				icon: 'chakraui',
				color: '#319795'
			},
			{
				title: 'Material UI',
				url: 'https://mui.com',
				icon: 'materialui',
				color: '#007FFF'
			},
			{
				title: 'Angular',
				url: 'https://angular.io',
				icon: 'angular',
				color: '#DD0031'
			},
			{
				title: 'PrimeNG',
				url: 'https://www.primefaces.org/primeng',
				icon: 'prime',
				collection: 'prime',
				color: '#DD0031'
			},
			{
				title: 'SvelteKit',
				url: 'https://kit.svelte.dev',
				icon: 'svelte',
				color: '#FF3E00'
			}
		],
		tools: [
			{
				title: 'Git',
				url: 'https://git-scm.com',
				icon: 'git',
				color: '#F05032'
			},
			{
				title: 'GitHub',
				url: 'https://github.com',
				icon: 'github',
				color: '#FFFFFF'
			},
			{
				title: 'Windows Terminal',
				url: 'https://docs.microsoft.com/windows/terminal',
				icon: 'windowsterminal',
				color: '#FFFFFF'
			},
			{
				title: 'Visual Studio Code',
				url: 'https://code.visualstudio.com',
				icon: 'visualstudiocode',
				color: '#007ACC'
			},
			{
				title: 'npm',
				url: 'https://www.npmjs.com',
				icon: 'npm',
				color: '#CB3837'
			},
			{
				title: 'yarn',
				url: 'https://yarnpkg.com',
				icon: 'yarn',
				color: '#007ACC'
			},
			{
				title: 'pnpm',
				url: 'https://pnpm.io',
				icon: 'pnpm',
				color: '#F69220'
			},
			{
				title: 'Webpack',
				url: 'https://webpack.js.org',
				icon: 'webpack',
				color: '#8DD6F9'
			},
			{
				title: 'Babel',
				url: 'https://babeljs.io',
				icon: 'babel',
				color: '#F9DC3E'
			},
			{
				title: 'Vite',
				url: 'https://vitejs.dev',
				icon: 'vite',
				color: '#646CFF'
			},
			{
				title: 'ESLint',
				url: 'https://eslint.org',
				icon: 'eslint',
				color: '#4B32C3'
			},
			{
				title: 'Prettier',
				url: 'https://prettier.io',
				icon: 'prettier',
				color: '#F7B93E'
			},
			{
				title: 'Markdown',
				url: 'https://markdownguide.org',
				icon: 'markdown',
				color: '#FFFFFF'
			},
			{
				title: 'Insomnia',
				url: 'https://insomnia.rest',
				icon: 'insomnia',
				color: '#4000BF'
			},
			{
				title: 'Vercel',
				url: 'https://vercel.com',
				icon: 'vercel',
				color: '#FFFFFF'
			},
			{
				title: 'Netlify',
				url: 'https://netlify.com',
				icon: 'netlify',
				color: '#00C7B7'
			},
			{
				title: 'Render',
				url: 'https://render.com',
				icon: 'render',
				color: '#46E3B7'
			},
			{
				title: 'Heroku',
				url: 'https://heroku.com',
				icon: 'heroku',
				color: '#430098'
			},
			{
				title: 'Figma',
				url: 'https://figma.com',
				icon: 'figma',
				color: '#F24E1E'
			},
			{
				title: 'Framer',
				url: 'https://framer.com',
				icon: 'framer',
				color: '#0055FF'
			},
			{
				title: 'Notion',
				url: 'https://notion.so',
				icon: 'notion',
				color: '#FFFFFF'
			}
		]
	};

	const initSwiper = () => {
		register();

		Object.assign(techsSwiperElement, swiperOptions);
		Object.assign(toolsSwiperElement, {
			...swiperOptions,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
				reverseDirection: true
			}
		});

		techsSwiperElement.initialize();
		toolsSwiperElement.initialize();

		return Promise.resolve(true);
	};

	onMount(async () => {
		await initSwiper();

		const { observer } = observeScroll({ threshold: 0.5 });

		return () => observer && observer.disconnect();
	});
</script>

<Metadata />

<section id="blurb" class="observe__scroll">
	<div class="blurb__content">
		<div class="blurb__image" in:fade={{ delay: 2000, easing: cubicOut }}>
			<Atropos class="atropos__profile" shadow={false} highlight={false}>
				<figure class="triangle" data-atropos-offset="0" />
				<figure class="profile" data-atropos-offset="0" />

				<div
					class="popup top-10 left-12 before:from-primary before:to-black"
					data-atropos-offset="14"
				>
					<div class="popup__content">
						<span class="emoji">👨‍💻</span>
						<span class="skill">Dev Full-Stack</span>
					</div>
				</div>
				<div
					class="popup top-72 left-0 before:from-secondary before:to-black"
					data-atropos-offset="16"
				>
					<div class="popup__content">
						<span class="emoji">👨‍🎨</span>
						<span class="skill">UX Designer</span>
					</div>
				</div>
				<div
					class="popup bottom-0 right-10 before:from-accent before:to-black"
					data-atropos-offset="20"
				>
					<div class="popup__content">
						<span class="emoji">✨</span>
						<span class="skill">+2 anos de experiência</span>
					</div>
				</div>
			</Atropos>
		</div>

		<div>
			<code>profile<span class="method">.welcome()</span>;</code>

			<h1 in:fly={{ x: -150, duration: 1000, delay: 2000, easing: cubicOut }}>
				Saudações! Eu sou
				<span class="underline underline-offset-8">Gustavo Morinaga</span>
			</h1>

			<p in:fly={{ x: -200, duration: 1000, delay: 2050, easing: cubicOut }}>
				Desenvolvedor full-stack criativo e apaixonado em criar soluções completas, eficientes e de
				alta tecnologia.
			</p>

			<ul class="socials" in:fly={{ x: -250, duration: 1000, delay: 2100, easing: cubicOut }}>
				{#each socialLinks as socialLink, index}
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
			</ul>
		</div>
	</div>

	<a class="scroll__to" href="#about" on:click|preventDefault={scrollIntoView}>
		<Icon icon="chevrons-down" size="lg" />
	</a>
</section>

<section id="about" class="observe__scroll">
	<div class="about__card">
		<figure />

		<div class="card-body">
			<h2>Sobre mim</h2>

			<h3>Full-Stack Developer & UI/UX Designer</h3>

			<p>
				Meu nome é Gustavo Morinaga, tenho 22 anos, sou desenvolvedor Full-Stack e UI/UX Designer.
				Desenvolvo sites e aplicações completas com as melhores tecnologias disponíveis no mercado.
				Sempre estou em constante aprendizado e com o objetivo de entregar a melhor experiência e
				performance possível.
			</p>

			<blockquote cite="https://www.pensador.com/autor/david_ribeiro_guilherme">
				<p>"Não é a linguagem de programação que define o programador, mas sim sua lógica."</p>
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
					Mais detalhes

					<Icon icon="chevron-right" />
				</a>
			</div>
		</div>
	</div>

	<a class="scroll__to" href="#knowledges" on:click|preventDefault={scrollIntoView}>
		<Icon icon="chevrons-down" size="lg" />
	</a>
</section>

<section id="knowledges" class="observe__scroll">
	<div class="knowledges__content">
		<h2>Conhecimentos</h2>

		<p>Múltiplas ferramentas, múltiplas possibilidades em solucionar múltiplos problemas...</p>

		<swiper-container bind:this={techsSwiperElement} class="knowledges__carousel" init="false">
			{#each knowledges.techs as tech}
				<swiper-slide>
					<a
						class="knowledge"
						style="--icon-color: {tech.color}"
						href={tech.url}
						title={tech.title}
						aria-label={tech.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon collection={tech.collection || 'simple-icons'} icon={tech.icon} size="xl" />
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>

		<swiper-container bind:this={toolsSwiperElement} class="knowledges__carousel" init="false">
			{#each knowledges.tools as tool}
				<swiper-slide>
					<a
						class="knowledge"
						style="--icon-color: {tool.color}"
						href={tool.url}
						title={tool.title}
						aria-label={tool.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon collection={tool.collection || 'simple-icons'} icon={tool.icon} size="xl" />
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</section>

<style lang="scss" global>
	#blurb {
		@apply relative hero h-gutter-header;

		& .blurb__content {
			@apply hero-content flex-col lg:flex-row-reverse -mt-32 px-4 sm:px-0 text-center lg:text-left;

			& code {
				@apply typewriter;
			}

			& h1 {
				@apply text-3xl lg:text-5xl font-futuristic lg:leading-tight text-shadow-rgb mb-8;
			}

			& p {
				@apply text-xl mb-16 text-shadow-md shadow-black;
			}

			& .socials {
				@apply flex gap-2 items-center flex-wrap;

				& .social {
					@apply w-full lg:w-fit;

					&.cta {
						@apply flex-grow lg:flex-grow-0;

						& .btn__social {
							@apply btn-primary btn-block lg:w-fit shadow-glow shadow-primary/25 hover:shadow-lg hover:shadow-primary/30;
						}
					}

					&:not(.cta) {
						@apply tooltip tooltip-bottom flex-1 lg:flex-initial;

						& .btn__social {
							@apply btn-link text-shadow-md shadow-black;
						}
					}
				}

				& .btn__social {
					@apply btn btn-primary gap-2 hover:-translate-y-1;
				}
			}

			& .blurb__image {
				@apply scale-75 lg:scale-100 -mt-20 -mb-8 lg:my-0;
			}
		}
	}

	.atropos__profile {
		@apply w-fit h-fit p-2;

		&:hover {
			& .profile {
				@apply grayscale-0;

				&:after {
					@apply animate-glitch opacity-50;
				}
			}
			& .popup {
				@apply before:animate-spin-background before:shadow-lg animate-none;

				& .popup__content {
					& .skill {
						@apply max-w-fit ml-1 opacity-100;
					}
				}
			}
		}

		& .triangle {
			@apply absolute inset-0 bg-cover bg-no-repeat text-primary text-opacity-40 drop-shadow-md;
			background-image: url('/images/svgs/triangle.svg');
		}
		& .profile {
			@apply relative z-auto w-96 h-96 bg-cover bg-no-repeat drop-shadow-md shadow-red-500 grayscale;
			background-image: url('/images/webps/profile-cropped.webp');
			clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);

			&:after {
				content: '';
				@apply absolute inset-0 w-full h-full bg-cover bg-no-repeat drop-shadow-md opacity-0 mix-blend-hard-light transition-opacity ease-out;
				background-image: url('/images/webps/profile-cropped.webp');
				clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);
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

		& :global(.atropos-inner) {
			@apply overflow-visible;
		}
		& :global(.atropos-highlight) {
			@apply hidden;
		}
		& :global(.atropos-shadow) {
			@apply w-[90%] h-[90%];
		}
	}

	#about {
		@apply relative grid place-items-center h-screen;

		& .about__card {
			@apply card card-side items-center h-fit bg-base-100/75 border border-base-200 backdrop-blur-md shadow-lg shadow-black;

			& > figure {
				@apply min-w-[15vw] h-[50vh] m-4 bg-cover bg-no-repeat;
				background-image: url('/images/webps/profile.webp');
			}

			& .card-body {
				@apply p-4;

				& h2 {
					@apply mb-2 text-4xl font-futuristic text-shadow-glow shadow-primary;
				}

				& h3 {
					@apply mb-2 text-xl;
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
						@apply btn btn-primary btn-wide;
					}
				}
			}
		}
	}

	#knowledges {
		@apply relative grid place-items-center h-screen;

		& .knowledges__content {
			@apply absolute w-screen py-8 text-center bg-stone-900 bg-cover bg-no-repeat bg-center bg-fixed bg-blend-hard-light border-y border-stone-300/10 shadow-2xl shadow-black;
			background-image: url('/images/svgs/low-poly-grid.svg');

			& h2 {
				@apply text-2xl lg:text-4xl font-futuristic mb-4 text-shadow-glow shadow-primary;
			}

			& p {
				@apply text-xl mb-4 text-shadow-md shadow-black;
			}

			& .knowledges__carousel {
				@apply w-full h-28;

				& .knowledge {
					@apply grid place-items-center w-full h-full text-zinc-400 hover:text-[var(--icon-color)] drop-shadow-lg hover:scale-110 grayscale hover:grayscale-0 ease-smooth;
					transition: all 0.5s ease, opacity 0.5s, transform 1s, filter 1s;

					&:hover {
						& .icon {
							&::before {
								@apply opacity-10;
							}
						}
					}

					& .icon {
						@apply relative;

						&::before {
							content: '';
							@apply absolute inset-3 block bg-white rounded-full blur-lg opacity-0 transition-opacity;
						}
					}
				}
			}
		}
	}

	.scroll__to {
		@apply absolute bottom-8 drop-shadow-md animate-bounce text-shadow-md shadow-black;
	}
</style>
