<script lang="ts">
	import '../app.scss';
	import '@fontsource/caveat';
	import '@fontsource/righteous';
	import '@fontsource/orbitron';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { Background, Icon, Partytown, Player, Transition, Vitals } from '$lib/components';
	import { scrollToTop } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let scrollTopRef: HTMLButtonElement;

	const routes = [
		{
			title: 'Blog',
			path: '/blog'
		},
		{
			title: 'Sobre mim',
			path: '/about'
		},
		{
			title: 'Projetos',
			path: '/projects'
		}
	];

	let isThree!: boolean;
	let finished!: boolean;

	$: readMode = ['/blog'].includes($page.url.pathname);
	$: showContent = isThree ? finished : true;
	$: isCurrentRoute = (path: string) => $page.url.pathname === path;

	const handleOnScroll = () => {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
			scrollTopRef.classList.add('show');
		else scrollTopRef.classList.remove('show');
	};
</script>

<svelte:window on:scroll={handleOnScroll} />

{#if !dev}
	<Partytown />
	<Vitals />
{/if}

<Background bind:isThree bind:finished bind:readMode />

{#if showContent}
	<header in:fly={{ duration: 1000, y: -100, easing: expoOut }}>
		<div class="header__wrapper">
			<div class="left__corner">
				<div />
			</div>

			<a href="/">
				<div class="logo">
					<span class="retro">Gustavo Morinaga</span>
					<span class="handwritten">Developer</span>
				</div>
			</a>

			<nav>
				{#each routes as route}
					<a class={isCurrentRoute(route.path) ? 'active' : null} href={route.path}>
						{route.title}
					</a>
				{/each}
			</nav>

			<div class="right__corner">
				<div />
			</div>
		</div>
	</header>

	<main>
		<Transition>
			<slot />
		</Transition>
	</main>

	<button
		bind:this={scrollTopRef}
		class="btn__scroll__top"
		title="Scroll to top"
		on:click={scrollToTop}
	>
		<Icon icon="arrow-big-up-lines" />
	</button>

	<Player playlist={data.playlist.data} />
{/if}

<style lang="scss" global>
	header {
		@apply relative z-40 h-[4.5rem];

		& .header__wrapper {
			@apply fixed z-50 top-0 left-0 right-0 max-w-screen-lg my-0 mx-auto flex justify-between items-center px-4 bg-black/75 backdrop-blur-sm border-zinc-800 shadow-md;
			border-bottom-width: 1px;

			& .logo {
				@apply relative flex flex-col;

				& .retro {
					@apply font-retro uppercase text-base sm:text-2xl text-white text-shadow-glow shadow-zinc-500;
				}

				& .handwritten {
					@apply self-center -mt-4 ml-2 font-handwritten text-base sm:text-2xl text-red-500 text-shadow-glow shadow-red-900;
				}
			}

			& nav {
				@apply relative hidden sm:flex;

				& > a {
					@apply relative py-6 px-4 font-futuristic uppercase text-white shadow-red-500/50 transition-all ease-in hover:text-red-500 hover:text-shadow-glow;

					&::before {
						content: '';
						@apply absolute left-0 -bottom-px w-full h-px bg-red-500 shadow-glow shadow-red-500/50 opacity-0 transition-opacity ease-in;
					}

					&.active {
						@apply text-red-500 text-shadow-glow shadow-red-500/50;

						&::before {
							@apply opacity-100;
						}
					}
				}
			}

			& .left__corner,
			& .right__corner {
				@apply fixed w-16 h-full overflow-hidden bg-zinc-800;

				& > div {
					@apply absolute bg-black;
				}
			}

			& .left__corner {
				@apply top-0 -left-16;

				&,
				& > div {
					clip-path: polygon(0 0, 100% 101%, 100% 0);
				}

				& > div {
					@apply top-0 left-px right-0 bottom-px;
				}
			}
			& .right__corner {
				@apply top-0 -right-16;

				&,
				& > div {
					clip-path: polygon(0 0, 0% 101%, 100% 0);
				}

				& > div {
					@apply top-0 left-0 right-px bottom-px;
				}
			}
		}
	}

	main {
		@apply relative max-w-screen-lg min-h-screen my-0 mx-auto;
	}

	.btn__scroll__top {
		@apply fixed z-40 right-8 bottom-28 btn btn-ghost btn-circle text-shadow-md shadow-black opacity-0 pointer-events-none transition-opacity duration-300 ease-out;

		&.show {
			@apply opacity-100 pointer-events-auto;
		}
	}
</style>
