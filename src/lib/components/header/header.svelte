<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { Icon } from '$lib/components';
	import { DRAWER, LANG } from '$lib/stores';
	import anime from 'animejs';
	import type { IRoute } from '$lib/types';

	export let routes: IRoute[] = [];
	export let specialRoutes: string[] = [];

	$: isCurrentRoute = (path: string) => $page.url.pathname === path;

	const handleAnimateLogo = async () => {
		anime
			.timeline({
				targets: '.logo #logo',
				transformStyle: 'preserve-3d',
				transformOrigin: '50%',
				easing: 'easeInOutQuint'
			})
			.add({
				opacity: 0,
				rotateX: '-45deg',
				translateY: -10,
				duration: 300
			})
			.add({
				opacity: 1,
				rotateX: '0deg',
				translateY: 0
			});

		anime
			.timeline({
				targets: '.logo #slogan',
				transformStyle: 'preserve-3d',
				transformOrigin: '50%',
				easing: 'easeInOutQuint'
			})
			.add({
				opacity: 0,
				rotateX: '45deg',
				translateY: 10,
				duration: 300
			})
			.add({
				opacity: 1,
				rotateX: '0deg',
				translateY: 0
			});
	};

	const handleLanguage = () => LANG.change($LANG.code === 'pt' ? 'en' : 'pt');
</script>

<header id="header" in:fly={{ duration: 1000, y: -100, easing: expoOut }}>
	<div class="header__wrapper">
		<div class="header__content">
			<button class="btn__drawer" on:click={() => DRAWER.set(true)}>
				<Icon icon="menu-2" />
			</button>

			<a href="/" class="logo" title={$LANG.header.logo.alt} on:click={handleAnimateLogo}>
				<img id="logo" src="/images/svgs/logo-text.svg" alt="Logotype" />
				<img id="slogan" src="/images/svgs/slogan-text.svg" alt="Slogan" />
			</a>

			<nav>
				{#each routes as route}
					{#if !specialRoutes.includes(route.path)}
						<a
							class:active={isCurrentRoute(route.path)}
							class:disabled={!route.active}
							href={route.path}
						>
							{route.title}
						</a>
					{:else}
						<a
							class="w-fit"
							class:active={isCurrentRoute(route.path)}
							class:disabled={!route.active}
							title={route.title}
							aria-label={route.title}
							href={route.path}
						>
							<Icon icon={route.icon} />
						</a>
					{/if}
				{/each}
			</nav>

			<button
				class="btn__lang"
				title={$LANG.header.lang}
				aria-label={$LANG.header.lang}
				on:click={handleLanguage}
			>
				<Icon
					icon="flag-for-{$LANG.code === 'pt' ? 'brazil' : 'united-states'}"
					collection="emojione"
					animate
				/>
			</button>
		</div>
	</div>
</header>

<style lang="scss" global>
	#header {
		@apply relative z-40 h-[4.5rem];

		& .header__wrapper {
			@apply border-b border-base-200 fixed z-50 top-0 left-0 right-0 bg-base-100/75 backdrop-blur-sm shadow-lg;

			& .header__content {
				@apply flex justify-between sm:justify-start items-center max-w-screen-lg min-h-16 mx-auto my-0 px-2 lg:px-0;

				& .logo {
					@apply relative flex flex-col items-center w-52 h-fit mx-auto md:ml-0;

					& > * {
						@apply focus:outline-none;
					}

					& #logo {
						@apply w-full h-8 drop-shadow-md shadow-black;
					}
					& #slogan {
						@apply w-full h-6 -mt-3 z-10 drop-shadow-md shadow-black;
					}
				}

				& nav {
					@apply relative hidden sm:flex;

					& > a {
						@apply relative py-6 px-4 font-futuristic text-white shadow-red-500/50 transition-all ease-in hover:text-red-500 hover:text-shadow-glow;

						&::before {
							content: '';
							@apply absolute z-40 left-0 -bottom-px w-full h-px bg-red-500 shadow-glow shadow-red-500/50 opacity-0 transition-opacity ease-in;
						}

						&.active {
							@apply text-red-500 text-shadow-glow shadow-red-500/50;

							&::before {
								@apply opacity-100;
							}
						}

						&.disabled {
							@apply pointer-events-none opacity-50;
						}
					}
				}

				& .btn__lang {
					@apply block rounded-full mx-4 border border-zinc-400;
				}

				.btn__drawer {
					@apply inline-flex sm:hidden btn btn-ghost drawer-button;
				}
			}
		}
	}
</style>
