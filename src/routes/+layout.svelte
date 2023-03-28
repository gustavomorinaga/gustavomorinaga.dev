<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	import { getGPUTier } from 'detect-gpu';
	import { Analytics, Background, Footer, Icon, PageTransition, Preload } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { ACHIEVEMENTS, COOKIE_CONSENT, DRAWER, GPU, LANG, NOTIFICATIONS } from '$lib/stores';
	import { baseURL, containerElement, extractMainPath } from '$lib/utils';
	import type { IRoute } from '$lib/types';

	export let data;

	let finished: boolean;
	let isMobile = false;
	let showDrawer = false;

	$: showContent = $GPU.isThree ? finished : true;
	$: readMode = ['/blog'].includes(data.pathname);
	$: routes = [
		{
			title: $LANG.header.home,
			path: '/',
			icon: 'home',
			active: true,
			special: false
		},
		{
			title: $LANG.header.blog,
			path: '/blog',
			icon: 'news',
			active: false,
			special: false
		},
		{
			title: $LANG.header.about,
			path: '/about',
			icon: 'user',
			active: true,
			special: false
		},
		{
			title: $LANG.header.projects,
			path: '/projects',
			icon: 'code',
			active: true,
			special: false
		},
		{
			title: $LANG.header.bookmarks,
			path: '/bookmarks',
			icon: 'bookmark',
			active: true,
			special: true
		}
	] satisfies IRoute[];
	$: trigger = extractMainPath(data.pathname);

	const handleResize = () => {
		handleIsMobile();
		showDrawer = isMobile;

		!showDrawer && DRAWER.set(false);
	};

	const handleIsMobile = () => (isMobile = window.matchMedia('(max-width: 640px)').matches);

	onMount(async () => {
		if (!$GPU?.gpu) {
			const detectedGPU = await getGPUTier();

			GPU.change(detectedGPU);
		}

		(containerElement as HTMLElement).classList.toggle('low__end', $GPU.isLowEnd);

		handleIsMobile();
		showDrawer = isMobile;
	});
</script>

<svelte:window on:resize={handleResize} />

<Preload />

<Analytics />

<Background bind:finished bind:readMode />

{#if showContent}
	{#await import('$lib/components/header') then { Header }}
		<Header routes={routes.filter(r => r.path !== '/')} />
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

	{#await import('$lib/components/scroll-top') then { ScrollTop }}
		<ScrollTop />
	{/await}

	{#if data.playlist && data.playlist.meta.pagination.pageCount}
		{#await import('$lib/components/player') then { Player }}
			<Player playlist={data.playlist.data} />
		{/await}
	{/if}

	{#if !$COOKIE_CONSENT.accepted}
		{#await import('$lib/components/cookie-consent') then { CookieConsent }}
			<CookieConsent />
		{/await}
	{/if}

	{#if $NOTIFICATIONS.length}
		{#await import('$lib/components/notification') then { Notification }}
			<Notification />
		{/await}
	{/if}

	{#if $ACHIEVEMENTS.length}
		{#await import('$lib/components/achievement') then { Achievement }}
			<Achievement />
		{/await}
	{/if}
{/if}

<main>
	<PageTransition isMain {trigger}>
		<slot />
	</PageTransition>
</main>

<Footer />

<style lang="scss" global>
	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto px-4 md:px-8 lg:px-0 pt-8 pb-40;
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
