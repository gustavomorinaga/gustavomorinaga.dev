<script lang="ts">
	import { page } from '$app/stores';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { IMAGES_SVG } from '$lib/images';
	import { ACHIEVEMENTS, DRAWER, LANG } from '$lib/stores';
	import { baseURL, containerElement, extractMainPath } from '$lib/utils';
	import anime from 'animejs';
	import type { IRoute } from '$lib/ts';

	export let readMode = false;
	export let routes: IRoute[] = [];

	const readingProgress = tweened(0, { duration: 300, easing: expoOut });
	let readingScrollOverpassed = false;
	let logoClickedTimes = 0;

	$: isCurrentRoute = (path: string) =>
		extractMainPath({ path: $page.url.pathname, force: true }) === path;

	const handleLogo = () => {
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

		handleLogoAchievement();
	};

	const handleLogoAchievement = () => {
		if (ACHIEVEMENTS.unlocked('GMD_LOGO')) return;

		logoClickedTimes++;
		logoClickedTimes === 5 && ACHIEVEMENTS.unlock('GMD_LOGO');
	};

	const handleLanguage = () => LANG.change($LANG.code === 'pt' ? 'en' : 'pt');

	const handleOnScroll = () => {
		if (!readMode) return;

		const { clientHeight, scrollTop } = containerElement as HTMLElement;
		const { offsetHeight } = document.querySelector('article.post section.content') as HTMLElement;
		const MIN = 0;
		const MAX = 100;
		const progress = Math.round((scrollTop / (offsetHeight + screen.height - clientHeight)) * MAX);
		readingScrollOverpassed = progress > MAX || progress === MIN;

		if (progress <= MAX) readingProgress.set(progress);
	};

	const handleSocialAchievement = () => ACHIEVEMENTS.unlock('GMD_SOCIAL');
</script>

<svelte:window on:scroll={handleOnScroll} />

<header id="header" in:fly={{ duration: 1000, y: -100, easing: expoOut }}>
	<div class="header__wrapper">
		<div class="header__content">
			<button class="btn__drawer" on:click={() => DRAWER.set(true)}>
				<Icon icon="menu-2" />
			</button>

			<a href="/" class="logo" title={$LANG.header.logo.alt} on:click={handleLogo}>
				<img id="logo" src={IMAGES_SVG.logoTitle} alt="Logotype" />
				<img id="slogan" src={IMAGES_SVG.logoSlogan} alt="Slogan" />
			</a>

			<nav>
				{#each routes as route}
					{#if !route.special}
						<a
							class:active={isCurrentRoute(route.path)}
							class:disabled={!route.active}
							href={route.path}
						>
							{route.title}
						</a>
					{:else}
						<a
							class="special"
							class:active={isCurrentRoute(route.path)}
							class:disabled={!route.active}
							title={route.title}
							aria-label={route.title}
							href={route.path}
							target={route.external ? '_blank' : ''}
							rel={route.external ? 'noopener noreferrer' : ''}
						>
							<Icon icon={route.icon} />
						</a>
					{/if}
				{/each}
			</nav>

			<div class="social dropdown dropdown-left dropdown-bottom dropdown-hover">
				<label title="Social" aria-label="Social" tabindex="-1">
					<input type="checkbox" hidden aria-hidden="true" />
					<Icon icon="social" />
				</label>

				<div class="dropdown-content" tabindex="-1">
					<ul>
						{#each profileJSON.social as socialLink}
							<li data-tip={socialLink.title}>
								<a
									href={socialLink.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={socialLink.title}
									on:click={handleSocialAchievement}
								>
									<Icon icon={socialLink.icon} />
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
								<Icon icon="file-info" />
							</a>
						</li>
					</ul>
				</div>
			</div>

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

		{#if readMode}
			<span
				class="progress__bar"
				class:opacity-0={readingScrollOverpassed}
				style="width: {$readingProgress}%;"
				in:fade={{ duration: 300, delay: 1000, easing: expoOut }}
				out:fade={{ duration: 300, easing: expoOut }}
			/>
		{/if}
	</div>
</header>

<style lang="scss" global>
	#header {
		@apply relative z-40 h-[4.5rem];

		& .header__wrapper {
			@apply border-b border-base-200 fixed z-50 top-0 left-0 right-0 bg-base-100/75 backdrop-blur-md shadow-lg;

			& .header__content {
				@apply flex justify-between sm:justify-start items-center max-w-screen-lg min-h-16 mx-auto my-0 px-2 sm:px-8 lg:px-0;

				& .btn__drawer {
					@apply inline-flex sm:hidden btn btn-ghost drawer-button;
				}

				& .logo {
					@apply relative flex flex-col items-center w-40 md:w-52 h-fit mx-auto md:ml-0;

					& > * {
						@apply focus:outline-none;
					}

					& #logo {
						@apply w-full h-8 drop-shadow-md;
					}
					& #slogan {
						@apply w-full h-5 md:h-6 -mt-3 z-10 drop-shadow-md;
					}
				}

				& nav {
					@apply relative hidden sm:flex;

					& > a {
						@apply relative grid place-items-center py-6 px-4 font-futuristic transition duration-300 ease-out hover:before:opacity-100;

						&::before {
							content: '';
							@apply absolute -z-10 inset-0 block bg-primary-content/5 my-4 mx-1 rounded-box opacity-0 blur transition-opacity duration-500 ease-out;
						}

						&::after {
							content: '';
							@apply absolute z-40 inset-x-0 -bottom-px block max-w-0 h-px mx-auto bg-gradient-to-r from-transparent via-primary shadow-glow shadow-primary/10 opacity-0 transition-all duration-300 ease-smooth;
						}

						&.special {
							@apply w-fit px-2;
						}

						&.active {
							@apply text-primary text-shadow-glow shadow-primary/50;

							&::after {
								@apply max-w-full opacity-100;
							}
						}

						&.disabled {
							@apply pointer-events-none opacity-50;
						}
					}
				}

				& .social {
					@apply hidden md:block z-50 mx-2;

					& .dropdown-content {
						@apply translate-x-20;

						& ul {
							@apply card card-side card-bordered mt-8 p-2 bg-base-100 shadow-lg;

							& li {
								@apply tooltip tooltip-bottom;

								& a {
									@apply btn btn-link btn-sm md:hover:-translate-y-1 transition-transform duration-300 ease-out;
								}
							}
						}
					}
				}

				& .btn__lang {
					@apply block rounded-full ml-2 mr-4 md:mr-0 border border-zinc-400;
				}
			}

			& span.progress__bar {
				@apply absolute left-0 right-0 -bottom-px h-px bg-primary shadow-glow shadow-primary/10 transition-opacity duration-300 ease-out;
			}
		}
	}

	html.low__end {
		& #header {
			& .header__wrapper {
				@apply bg-base-100 backdrop-blur-none;
			}
		}
	}
</style>
