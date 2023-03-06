<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { observeScroll } from '$lib/utils';

	const projects = [
		{
			title: 'Portfolio',
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.',
			previewImage: '/images/pngs/preview.png'
		},
		{
			title: 'Portfolio',
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.',
			previewImage: '/images/pngs/preview.png'
		},
		{
			title: 'Portfolio',
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.',
			previewImage: '/images/pngs/preview.png'
		},
		{
			title: 'Portfolio',
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.',
			previewImage: '/images/pngs/preview.png'
		},
		{
			title: 'Portfolio',
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.',
			previewImage: '/images/pngs/preview.png'
		}
	];

	onMount(() => {
		const { observer } = observeScroll({ threshold: 0.5 });

		return () => observer && observer.disconnect();
	});
</script>

<Metadata title={$LANG.about.metadata.title} description={$LANG.about.metadata.description} />

<code class="projects">profile<span class="method">.projects()</span>;</code>

<article class="projects" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>Projetos</h1>

	<p>
		Alguns destaques dos meus projetos open-source. Veja todos no
		<a
			href="https://github.com/gustavomorinaga?tab=repositories"
			target="_blank"
			rel="noopener noreferrer"
		>
			GitHub
		</a>
		.
	</p>

	{#each projects as { title, description, previewImage }}
		<div>
			<figure class="preview">
				<img src={previewImage} width="480" alt="Preview" />
			</figure>
		</div>
	{/each}
</article>

<style lang="scss" global>
	code.projects {
		@apply md:mt-16;
	}

	article.projects {
		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-16;
		}

		& a {
			@apply link-primary link-hover;
		}
	}
</style>
