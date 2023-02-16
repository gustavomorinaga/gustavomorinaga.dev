<script lang="ts">
	import '../app.scss';
	import {
		Analytics,
		Background,
		Drawer,
		Footer,
		Header,
		Icon,
		PageTransition,
		Player,
		Preload,
		ScrollTop
	} from '$lib/components';
	import { DRAWER, LANG } from '$lib/stores';
	import type { IRoute } from '$lib/types';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let isThree!: boolean;
	let finished!: boolean;

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
</script>

<Preload />

<Analytics />

<Background bind:isThree bind:finished bind:readMode />

{#if showContent}
	<Header routes={routes.filter(r => r.path !== '/')} {specialRoutes} />

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

	<main>
		<PageTransition trigger={data.pathname}>
			<slot />
		</PageTransition>
	</main>

	<Player playlist={data.playlist.data} />

	<ScrollTop />

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
