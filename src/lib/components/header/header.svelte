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

<header id="header" in:fly|global={{ duration: 1000, y: -100, easing: expoOut }}>
	<div class="header__wrapper">
		<div class="header__content">
			<button class="btn__drawer" class:focus={$DRAWER} on:click={() => DRAWER.set(true)}>
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

			<div class="social dropdown-bottom dropdown-left dropdown-hover dropdown">
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
				in:fade|global={{ duration: 300, delay: 1000, easing: expoOut }}
				out:fade|global={{ duration: 300, easing: expoOut }}
			/>
		{/if}
	</div>
</header>

<style lang="scss" global>
	#header {
		@apply relative z-40 h-[4.5rem];

		& .header__wrapper {
			@apply fixed left-0 right-0 top-0 z-50 border-b border-base-200 bg-base-100/75 shadow-lg backdrop-blur-md;

			& .header__content {
				@apply min-h-16 mx-auto my-0 flex max-w-screen-lg items-center justify-between px-2 sm:justify-start sm:px-8 lg:px-0;

				& .btn__drawer {
					@apply btn-ghost btn inline-flex sm:hidden;

					&.focus {
						@apply btn-neutral;
					}
				}

				& .logo {
					@apply relative mx-auto flex h-fit w-40 flex-col items-center md:ml-0 md:w-52;

					& > * {
						@apply focus:outline-none;
					}

					& #logo {
						@apply h-8 w-full drop-shadow-md;
					}
					& #slogan {
						@apply z-10 -mt-3 h-5 w-full drop-shadow-md md:h-6;
					}
				}

				& nav {
					@apply relative hidden sm:flex;

					& > a {
						@apply relative grid place-items-center px-4 py-6 font-futuristic transition duration-300 ease-out hover:before:opacity-100;

						&::before {
							content: '';
							@apply rounded-box absolute inset-0 -z-10 mx-1 my-4 block bg-primary-content/5 opacity-0 blur transition-opacity duration-500 ease-out;
						}

						&::after {
							content: '';
							@apply absolute inset-x-0 -bottom-px z-40 mx-auto block h-px max-w-0 bg-gradient-to-r from-transparent via-primary opacity-0 shadow-glow shadow-primary/10 transition-all duration-300 ease-smooth;
						}

						&.special {
							@apply w-fit px-2;
						}

						&.active {
							@apply text-primary shadow-primary/50 text-shadow-glow;

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
					@apply z-50 mx-2 hidden md:block;

					& .dropdown-content {
						@apply translate-x-20;

						& ul {
							@apply card-bordered card card-side mt-8 bg-base-100 p-2 shadow-lg;

							& li {
								@apply tooltip tooltip-bottom;

								& a {
									@apply btn-link btn-sm btn transition-transform duration-300 ease-out md:hover:-translate-y-1;
								}
							}
						}
					}
				}

				& .btn__lang {
					@apply ml-2 mr-4 block rounded-full border border-zinc-400 md:mr-0;
				}
			}

			& span.progress__bar {
				@apply absolute -bottom-px left-0 right-0 h-px bg-primary shadow-glow shadow-primary/10 transition-opacity duration-300 ease-out;
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
