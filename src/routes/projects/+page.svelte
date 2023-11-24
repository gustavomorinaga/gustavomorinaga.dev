<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CarouselProjects, Icon, Metadata } from '$lib/components';
	import { IMAGES_WEBP } from '$lib/images';
	import { LANG } from '$lib/stores';
	import type { IProject } from '$lib/ts';

	$: projects = [
		{
			title: 'Matching Game',
			description: $LANG.projects['matching-game'].description,
			previewImage: IMAGES_WEBP.previewMatchingGame,
			repo: 'https://github.com/gustavomorinaga/matching-game',
			deploy: 'https://matching-game-sveltekit.vercel.app',
			tags: ['sveltekit', 'typescript', 'vite', 'sass']
		},
		{
			title: 'gustavomorinaga.dev',
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
	] satisfies IProject[];
</script>

<Metadata title={$LANG.projects.metadata.title} description={$LANG.projects.metadata.description} />

<code class="projects typewriter">profile<span class="method">.projects()</span>;</code>

<section class="projects" in:fly|global={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.projects.title}</h1>

	<p>{@html $LANG.projects.paragraph}</p>

	<div class="motion__instruction">
		<Icon icon="arrow-narrow-left" size="sm" />
		{$LANG.projects.gesture}
		<Icon icon="arrow-narrow-right" size="sm" />
	</div>

	<CarouselProjects {projects} />
</section>

<style lang="scss" global>
	code.projects {
		@apply md:mt-16;
	}

	section.projects {
		@apply min-h-[80vh];

		& > h1 {
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > p {
			@apply mb-8 text-base md:mb-16 md:text-xl;

			& > a {
				@apply link-hover link-primary;
			}
		}

		& .motion__instruction {
			@apply flex justify-center gap-2 p-4 text-sm md:hidden;

			& .icon {
				@apply text-primary;
			}
		}
	}
</style>
