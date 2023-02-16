<script lang="ts">
	import '../app.scss';
	import { Analytics, Background, Icon, Preload } from '$lib/components';
	import { DRAWER, LANG } from '$lib/stores';
	import type { IRoute } from '$lib/types';
	import type { LayoutServerData } from './$types';
	import { onMount } from 'svelte';

	export let data: LayoutServerData;

	let isThree!: boolean;
	let finished!: boolean;
	let showDrawer = false;

	const specialRoutes = ['/bookmarks'];

	$: showContent = isThree ? finished : true;
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

	onMount(() => {
		showDrawer = handleIsMobile();
	});
</script>

<svelte:window on:resize={handleResize} />

<Preload />

<Analytics />

<Background bind:isThree bind:finished bind:readMode />

{#if showContent}
	{#await import('$lib/components/header') then Module}
		<Module.Header routes={routes.filter(r => r.path !== '/')} {specialRoutes} />
	{/await}

	{#if showDrawer}
		{#await import('$lib/components/drawer') then Module}
			<Module.Drawer>
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
			</Module.Drawer>
		{/await}
	{/if}

	<main>
		{#await import('$lib/components/page-transition') then Module}
			<Module.PageTransition trigger={data.pathname}>
				<slot />
			</Module.PageTransition>
		{/await}
	</main>

	{#await import('$lib/components/scroll-top') then Module}
		<Module.ScrollTop />
	{/await}

	{#await import('$lib/components/player') then Module}
		<Module.Player playlist={data.playlist.data} />
	{/await}

	{#await import('$lib/components/footer') then Module}
		<Module.Footer />
	{/await}
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
