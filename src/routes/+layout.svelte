<script lang="ts">
	import '$lib/styles/global.scss';
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Analytics, Background, Footer, Icon, PageTransition, Preload } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { ACHIEVEMENTS, COOKIE_CONSENT, DRAWER, GPU, LANG, NOTIFICATIONS } from '$lib/stores';
	import { baseURL, containerElement, extractMainPath, logoASCII } from '$lib/utils';
	import { getGPUTier } from 'detect-gpu';
	import type { ICMSData, IPlaylistTrack, IRoute } from '$lib/ts';

	export let data;

	let finished: boolean;
	let isMobile = false;
	let playlist: IPlaylistTrack[] = [];

	$: showContent = $GPU.isThree ? finished : true;
	$: showDrawer = isMobile;
	$: trigger = extractMainPath({ path: data.pathname });
	$: readMode =
		data.pathname.includes('/blog/') && !data.pathname.includes('/blog/tags/') && !$page.error;
	$: if (browser && containerElement)
		(containerElement as HTMLElement).classList.toggle('low__end', $GPU.isLowEnd);
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
			active: dev,
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
		},
		{
			title: $LANG.header.feed,
			path: '/feed.xml',
			icon: 'rss',
			active: true,
			special: true,
			external: true
		}
	] satisfies IRoute[];

	const handleIsMobile = () => (isMobile = window.matchMedia('(max-width: 640px)').matches);

	const handleResize = () => {
		handleIsMobile();

		!showDrawer && DRAWER.set(false);
	};

	const loadPlaylist = async () => {
		playlist = await fetch('/api/playlist')
			.then<ICMSData<IPlaylistTrack[]>>(res => res.json())
			.then(res => res.data);

		return playlist;
	};

	onMount(async () => {
		if (!$GPU?.gpu) {
			const detectedGPU = await getGPUTier();

			GPU.change(detectedGPU);
		}

		handleIsMobile();

		console.log(logoASCII);

		await loadPlaylist();
	});
</script>

<svelte:window on:resize={handleResize} />

<Preload />

<Analytics />

<Background bind:finished bind:readMode />

{#if showContent}
	{#await import('$lib/components/header') then { Header }}
		<Header routes={routes.filter(r => r.path !== '/')} {readMode} />
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

						<li data-tip={$LANG.resume.title}>
							<a
								href={`${baseURL}/files/pdfs/resume-${$LANG.code}.pdf`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={$LANG.resume.title}
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

	{#if playlist?.length}
		{#await import('$lib/components/player') then { Player }}
			<Player {playlist} />
		{/await}
	{/if}

	{#if !$COOKIE_CONSENT.accepted}
		{#await import('$lib/components/cookie-consent') then { CookieConsent }}
			<CookieConsent />
		{/await}
	{/if}

	{#if $NOTIFICATIONS?.length}
		{#await import('$lib/components/notification') then { Notification }}
			<Notification />
		{/await}
	{/if}

	{#if $ACHIEVEMENTS?.length}
		{#await import('$lib/components/achievement') then { Achievement }}
			<Achievement />
		{/await}
	{/if}
{/if}

<main>
	<PageTransition goTop {trigger}>
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
			@apply flex flex-wrap justify-between;

			& li {
				@apply btn btn-link btn-sm px-2;
			}
		}
	}
</style>
