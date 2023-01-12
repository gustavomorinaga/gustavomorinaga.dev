<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import type { ISocial } from '$lib/types';
	import Atropos from 'atropos/svelte';

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
</script>

<svelte:head>
	<title>Gustavo Morinaga Developer</title>
	<meta name="description" content="Gustavo Morinaga Developer" />
</svelte:head>

<div class="blurb">
	<div class="blurb__content">
		<div class="blurb__image" in:fade={{ delay: 2000, easing: cubicOut }}>
			<Atropos class="atropos__profile" shadow={false} highlight={false}>
				<div
					class="triangle"
					data-atropos-offset="0"
					style="--triangle: url('/images/svgs/triangle.svg');"
				/>
				<div
					class="profile"
					data-atropos-offset="0"
					style="--profile: url('/images/pngs/profile-cropped.png');"
				/>

				<div
					class="popup top-6 left-12 before:from-primary before:to-black"
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
						<span class="skill">2 anos de experiência</span>
					</div>
				</div>
			</Atropos>
		</div>

		<div>
			<code>profile<span class="method">.welcome()</span>;</code>

			<h1 in:fly={{ x: -100, duration: 1000, delay: 2000, easing: cubicOut }}>
				Saudações! Eu sou
				<span class="underline underline-offset-8">Gustavo Morinaga</span>
			</h1>

			<p in:fly={{ x: -125, duration: 1000, delay: 2050, easing: cubicOut }}>
				Desenvolvedor full-stack criativo e apaixonado em criar soluções eficientes e de alta
				tecnologia
			</p>

			<ul class="socials" in:fly={{ x: -150, duration: 1000, delay: 2100, easing: cubicOut }}>
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
</div>

<style lang="scss">
	.blurb {
		@apply hero;

		& .blurb__content {
			@apply hero-content flex-col lg:flex-row-reverse;

			code {
				@apply typewriter;
			}

			h1 {
				@apply text-5xl font-futuristic text-shadow-rgb mb-8;
			}

			p {
				@apply text-xl mb-16 text-shadow-md shadow-black;
			}

			.socials {
				@apply flex gap-2 items-center;

				& .social {
					&.cta {
						& .btn__social {
							@apply btn-primary shadow-glow shadow-primary/25 hover:shadow-lg hover:shadow-primary/30;
						}
					}

					&:not(.cta) {
						@apply tooltip tooltip-bottom;

						& .btn__social {
							@apply btn-link text-shadow-md shadow-black;
						}
					}
				}

				& .btn__social {
					@apply btn btn-primary gap-2 hover:-translate-y-1;
				}
			}
		}
	}

	:global(.atropos__profile) {
		@apply w-fit h-fit p-2;

		&:hover {
			& .profile {
				@apply grayscale-0;

				&:after {
					@apply animate-glitch opacity-50;
				}
			}
			& .popup {
				@apply before:animate-spin-background before:shadow-lg;

				& .popup__content {
					& .skill {
						@apply max-w-fit ml-1 opacity-100;
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
			background-image: var(--profile);
			clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);

			&:after {
				content: '';
				@apply absolute inset-0 w-full h-full bg-cover bg-no-repeat drop-shadow-md opacity-0 mix-blend-hard-light transition-opacity ease-out;
				background-image: var(--profile);
				clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);
			}
		}
		& .popup {
			@apply absolute z-10 w-fit h-fit p-px overflow-hidden shadow-sm shadow-black;

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
</style>
