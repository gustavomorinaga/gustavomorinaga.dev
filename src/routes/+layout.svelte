<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	import { getGPUTier } from 'detect-gpu';
	import {
		Analytics,
		Background,
		Footer,
		Icon,
		PageTransition,
		Player,
		Preload,
		ScrollTop
	} from '$lib/components';
	import { DRAWER, GPU, LANG } from '$lib/stores';
	import { containerElement } from '$lib/utils';
	import type { IRoute } from '$lib/types';
	import type { LayoutServerData } from './$types';

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
			active: false
		},
		{
			title: $LANG.header.projects,
			path: '/projects',
			icon: 'code',
			active: false
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

		if ($GPU.isLowEnd) (containerElement as HTMLElement).classList.add('low__end');

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
				</svelte:fragment>
			</Drawer>
		{/await}
	{/if}
{/if}

<main>
	<PageTransition trigger={data.pathname}>
		<slot />
	</PageTransition>
</main>

{#if showContent}
	<ScrollTop />

	<Player playlist={data.playlist.data} />

	<Footer />
{/if}

<style lang="scss">
	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto px-4 lg:px-0 pt-8 pb-40;
	}

	.menu {
		& .menu__item {
			@apply rounded font-futuristic;

			&.disabled {
				@apply pointer-events-none opacity-50;
			}
		}
	}
</style>
