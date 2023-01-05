<script lang="ts">
	import '../app.postcss';
	import '@fontsource/caveat';
	import '@fontsource/righteous';
	import '@fontsource/share-tech-mono';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { Background, Player, Transition } from '$lib/components';

	const routes = [
		{
			title: 'Sobre mim',
			path: '/about'
		},
		{
			title: 'Serviços',
			path: '/services'
		},
		{
			title: 'Conhecimentos',
			path: '/knowledge'
		},
		{
			title: 'Projetos',
			path: '/projects'
		}
	];

	let currentRoute = '/';

	let isThree!: boolean;
	let finished!: boolean;

	$: showContent = isThree ? finished : true;

	const handleRouting = (path: string) => (currentRoute = path);

	$: isCurrentRoute = (path: string) => currentRoute === path;
</script>

<Background bind:isThree bind:finished />

{#if showContent}
	<header in:fly={{ duration: 1000, y: -100, easing: expoOut }}>
		<a href="/" on:click={() => handleRouting('/')}>
			<div class="logo">
				<span class="retro">Gustavo Morinaga</span>
				<span class="handwritten">Developer</span>
			</div>
		</a>

		<nav>
			{#each routes as route}
				<a
					class={isCurrentRoute(route.path) ? 'active' : null}
					href={route.path}
					on:click={() => handleRouting(route.path)}
				>
					{route.title}
				</a>
			{/each}
		</nav>
	</header>

	<main in:fly={{ duration: 1000, y: 100, easing: expoOut }}>
		<Transition refresh={currentRoute}>
			<slot />
		</Transition>
	</main>

	<Player />
{/if}

<style lang="scss" global>
	:global(html) {
		@apply max-w-full overflow-hidden;
	}
	:global(body) {
		@apply max-w-full min-h-screen overflow-x-hidden overflow-y-auto;
	}

	header {
		@apply relative flex justify-between items-center max-w-screen-lg my-0 mx-auto px-4 bg-transparent backdrop-blur-sm border-solid border-gray-800;
		border-width: 0 1px 1px 1px;

		& .logo {
			@apply relative flex flex-col;

			& .retro {
				@apply font-retro uppercase text-2xl text-white text-shadow-glow shadow-zinc-500;
			}

			& .handwritten {
				@apply self-end -mt-4 mr-4 font-handwritten text-2xl text-red-500 text-shadow-glow shadow-red-900;
			}
		}

		& nav {
			@apply relative flex;

			& > a {
				@apply relative py-6 px-4 font-mono text-white shadow-red-500/50 transition-all ease-in hover:text-red-500 hover:text-shadow-glow;

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
	}

	main {
		@apply relative max-w-screen-lg my-0 mx-auto;
	}
</style>
