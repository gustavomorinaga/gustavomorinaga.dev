<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import anime from 'animejs';

	const routes = [
		{
			title: 'Blog',
			path: '/blog',
			active: false
		},
		{
			title: 'Sobre mim',
			path: '/about',
			active: false
		},
		{
			title: 'Projetos',
			path: '/projects',
			active: false
		}
	];

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
</script>

<header id="header" in:fly={{ duration: 1000, y: -100, easing: expoOut }}>
	<div class="header__wrapper">
		<div class="header__content">
			<a href="/" class="logo" title="Página inicial" on:click={handleAnimateLogo}>
				<img id="logo" src="/images/svgs/logo-text.svg" alt="" />
				<img id="slogan" src="/images/svgs/slogan-text.svg" alt="" />
			</a>

			<nav>
				{#each routes as route}
					<a
						class={isCurrentRoute(route.path) ? 'active' : null}
						class:disabled={!route.active}
						href={route.path}
						data-sveltekit-noscroll
					>
						{route.title}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</header>

<style lang="scss" global>
	#header {
		@apply relative z-40 h-[4.5rem];

		& .header__wrapper {
			@apply border-b border-base-200 fixed z-50 top-0 left-0 right-0 bg-base-100/75 backdrop-blur-sm shadow-lg;

			& .header__content {
				@apply flex justify-between items-center max-w-screen-lg mx-auto my-0 px-4 lg:px-0;

				& .logo {
					@apply relative flex flex-col items-center w-52 h-fit;

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
			}
		}
	}
</style>
