<script lang="ts">
	import { Icon } from '$lib/components';
	import Atropos from 'atropos/svelte';

	interface ISocialLink {
		title: string;
		icon: string;
		url: string;
	}

	const socialLinks: ISocialLink[] = [
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
		}
	];
</script>

<svelte:head>
	<title>Gustavo Morinaga Developer</title>
	<meta name="description" content="Gustavo Morinaga Developer" />
</svelte:head>

<div class="blurb">
	<div class="blurb__content">
		<Atropos class="atropos__profile" shadow={false} highlight={false}>
			<div class="triangle" style="--triangle: url('/images/svgs/triangle.svg');" />
			<div class="profile" style="--profile: url('/images/pngs/profile-cropped.png');" />
		</Atropos>

		<div>
			<h1>Saudações, sou <span class="underline">Gustavo Morinaga</span></h1>

			<p>Full-Stack Developer, passionate about Front-End, Design and Technology in general</p>

			<ul class="socials">
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

			h1 {
				@apply text-5xl text-shadow-rgb font-futuristic mb-4;
			}

			p {
				@apply text-xl mb-8 text-shadow-md shadow-black;
			}

			.socials {
				@apply flex gap-2;

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
		@apply w-fit h-fit;

		&:hover {
			& .profile {
				@apply grayscale-0;

				&:after {
					@apply animate-glitch opacity-50;
				}
			}
		}

		& .triangle {
			@apply absolute inset-0 bg-cover bg-no-repeat drop-shadow-md;
			background-image: var(--triangle);
		}
		& .profile {
			@apply relative z-auto w-96 h-96 bg-cover bg-no-repeat drop-shadow-md shadow-red-500 grayscale;
			background-image: var(--profile);
			clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);

			&:after {
				content: '';
				@apply absolute inset-0 w-full h-full bg-cover bg-no-repeat opacity-0 mix-blend-hard-light transition-opacity ease-out;
				background-image: var(--profile);
				clip-path: polygon(32% 0, 85% 0, 82% 67%, 97.25% 97.5%, 0 97.5%, 22% 62%);
			}
		}

		& :global(.atropos-shadow),
		& :global(.atropos-highlight) {
			@apply hidden;
		}
	}
</style>
