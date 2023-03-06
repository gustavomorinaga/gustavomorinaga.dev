<script lang="ts">
	import '../app.scss';
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getGPUTier } from 'detect-gpu';
	import {
		Analytics,
		Background,
		Footer,
		Icon,
		PageTransition,
		Preload,
		ScrollTop
	} from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { DRAWER, GPU, LANG } from '$lib/stores';
	import { containerElement } from '$lib/utils';
	import type { IRoute } from '$lib/types';
	import type { LayoutServerData } from './$types';

	const baseURL = PUBLIC_DOMAIN;

	export let data: LayoutServerData;

	let finished: boolean;
	let showDrawer = false;

	const specialRoutes = ['/bookmarks'];

	$: showContent = $GPU.isThree ? finished : true;
	$: readMode = ['/blog'].includes(data.pathname);
	$: routes = [
		{
			title: $LANG.header.home,
			path: '/',
			icon: 'home',
			active: true
		},
		{
			title: $LANG.header.blog,
			path: '/blog',
			icon: 'news',
			active: false
		},
		{
			title: $LANG.header.about,
			path: '/about',
			icon: 'user',
			active: true
		},
		{
			title: $LANG.header.projects,
			path: '/projects',
			icon: 'code',
			active: true
		},
		{
			title: $LANG.header.bookmark,
			path: '/bookmarks',
			icon: 'bookmark',
			active: false
		}
	] satisfies IRoute[];

	const handleIsMobile = () => window.matchMedia('(max-width: 640px)').matches;
	const handleResize = () => {
		showDrawer = handleIsMobile();

		!showDrawer && DRAWER.set(false);
	};

	onMount(async () => {
		if (!$GPU?.gpu) {
			const detectedGPU = await getGPUTier();

			GPU.change(detectedGPU);
		}

		(containerElement as HTMLElement).classList.toggle('low__end', $GPU.isLowEnd);

		showDrawer = handleIsMobile();
	});
</script>

<svelte:window on:resize={handleResize} />

<Preload />

<Analytics />

<Background bind:finished bind:readMode />

{#if showContent}
	{#await import('$lib/components/header') then { Header }}
		<Header routes={routes.filter(r => r.path !== '/')} {specialRoutes} />
	{/await}

	{#if showDrawer}
		{#await import('$lib/components/drawer') then { Drawer }}
			<Drawer>
				<svelte:fragment slot="content">
					<ul class="menu">
						{#each routes as route}
							<li>
								<a
									class="menu__item"
									class:disabled={!route.active}
									href={route.path}
									on:click={() => DRAWER.set(false)}
								>
									<Icon icon={route.icon} />
									{route.title}
								</a>
							</li>
						{/each}
					</ul>

					<div class="divider" />

					<ul class="social">
						{#each profileJSON.social as socialLink}
							<li>
								<a
									href={socialLink.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={socialLink.title}
								>
									<Icon icon={socialLink.icon} size="sm" />
								</a>
							</li>
						{/each}

						<li data-tip={$LANG.curriculum.title}>
							<a
								href={`${baseURL}/files/pdfs/curriculum-${$LANG.code}.pdf`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={$LANG.curriculum.title}
							>
								<Icon icon="file-download" size="sm" />
							</a>
						</li>
					</ul>
				</svelte:fragment>
			</Drawer>
		{/await}
	{/if}
{/if}

<main>
	<PageTransition trigger={`${data.pathname.split('/').slice(1).shift()}`}>
		<slot />
	</PageTransition>
</main>

<Footer />

<ScrollTop />

{#if showContent}
	{#await import('$lib/components/player') then { Player }}
		<Player playlist={data.playlist.data} />
	{/await}
{/if}

<style lang="scss" global>
	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto px-4 lg:px-0 pt-8 pb-40;
	}

	.drawer {
		& .menu {
			& .menu__item {
				@apply rounded font-futuristic;

				&.disabled {
					@apply pointer-events-none opacity-50;
				}
			}
		}

		& .social {
			@apply flex flex-wrap justify-center;

			& li {
				@apply btn btn-link btn-sm;
			}
		}
	}
</style>
