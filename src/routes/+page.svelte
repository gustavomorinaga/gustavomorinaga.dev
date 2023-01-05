<script lang="ts">
	import { Icon } from '$lib/components';

	interface ISocialLink {
		title: string;
		icon: string;
		url: string;
	}

	const socialLinks: ISocialLink[] = [
		{
			title: 'GitHub',
			icon: 'brand-github',
			url: 'https://github.com/gmatthewsfeuer'
		},
		{
			title: 'LinkedIn',
			icon: 'brand-linkedin',
			url: 'https://www.linkedin.com/in/gustavo-morinaga27'
		},
		{
			title: 'Instagram',
			icon: 'brand-instagram',
			url: 'https://www.instagram.com/gmatthews_feuer'
		},
		{
			title: 'Facebook',
			icon: 'brand-facebook',
			url: 'https://www.facebook.com/gustavomatheus.cardoso'
		}
	];
</script>

<svelte:head>
	<title>Gustavo Morinaga Developer</title>
	<meta name="description" content="Gustavo Morinaga Developer" />
</svelte:head>

<h1>Bem-vindo viajante</h1>

<div class="profile" style="--profile: url('/images/pngs/profile.png');" />

{#each socialLinks as socialLink}
	<div class="tooltip tooltip-bottom" data-tip={socialLink.title}>
		<a class="btn btn-outline btn-primary" href={socialLink.url} aria-label={socialLink.title}>
			<Icon icon={socialLink.icon} />
		</a>
	</div>
{/each}

<style lang="scss">
	h1 {
		@apply text-5xl;
	}

	.profile {
		@apply relative z-auto w-96 h-96 bg-cover hover:after:animate-glitch hover:after:opacity-50 hover:before:-right-2 hover:before:-bottom-2;
		background-image: var(--profile);

		&:before {
			content: '';
			@apply absolute -z-10 -right-4 -bottom-4 w-full h-full bg-red-500 transition-all;
		}

		&:after {
			content: '';
			@apply absolute inset-0 w-full h-full bg-cover opacity-0 mix-blend-hard-light transition-opacity ease-out;
			background-image: var(--profile);
		}
	}
</style>
