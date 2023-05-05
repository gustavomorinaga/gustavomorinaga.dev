<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CarouselProjects, Icon, Metadata } from '$lib/components';
	import { IMAGES_WEBP } from '$lib/images';
	import { LANG } from '$lib/stores';
	import type { IProject } from '$lib/ts';

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
	] satisfies IProject[];
</script>

<Metadata title={$LANG.projects.metadata.title} description={$LANG.projects.metadata.description} />

<code class="typewriter projects">profile<span class="method">.projects()</span>;</code>

<div class="projects" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.projects.title}</h1>

	<p>{@html $LANG.projects.paragraph}</p>

	<span class="motion__instruction">
		<Icon icon="arrow-narrow-left" />
		{$LANG.projects.gesture}
		<Icon icon="arrow-narrow-right" />
	</span>

	<CarouselProjects {projects} />
</div>

<style lang="scss" global>
	code.projects {
		@apply md:mt-16;
	}

	div.projects {
		@apply min-h-[80vh];

		& > h1 {
			@apply text-3xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-base md:text-xl mb-8 md:mb-16;

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
	}
</style>
