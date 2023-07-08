<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, PageTransition } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
	import { dateFormatter, getAge, scrollToTop, speakText } from '$lib/utils';

	export let data;

	const age = getAge(profileJSON.birthday);

	$: routes = [
		{
			name: $LANG.about.actions.about,
			path: '/about',
			icon: 'info-circle'
		},
		{
			name: $LANG.about.actions.knowledge,
			path: '/about/knowledge',
			icon: 'topology-full'
		},
		{
			name: $LANG.about.actions.timeline,
			path: '/about/timeline',
			icon: 'timeline-event-text'
		},
		{
			name: $LANG.about.actions.setup,
			path: '/about/setup',
			icon: 'devices-pc'
		}
	];

	const handleSpeech = () => speakText('Gustavo Morinaga', 'pt-BR');
</script>

<code class="about typewriter">
	profile.
	<span class="method">
		{data.pathname.split('/').at(-1)}()
	</span>;
</code>

<section class="infos">
	<div
		class="info__content"
		in:fly|global={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}
	>
		<PageTransition trigger={data.pathname}>
			<slot />
		</PageTransition>
	</div>

	<aside>
		<div
			class="details"
			style="--low-poly-grid: url({IMAGES_SVG.bgLowPolyGrid})"
			in:fly|global={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}
		>
			<figure>
				<img src={IMAGES_WEBP.avatar} width="160" height="160" alt="Ready Player Me Avatar" />
			</figure>

			<div class="card-body">
				<h3>{$LANG.about.details.title}</h3>

				<ul>
					<li>
						<Icon icon="id-badge-2" />

						Gustavo Matheus Morinaga Cardoso

						{#if $LANG.code === 'en'}
							<button class="btn__pronounce" on:click={handleSpeech}>
								<Icon icon="volume" size="xs" />
							</button>
						{/if}
					</li>
					<li>
						<Icon icon="cake" />
						{dateFormatter({
							lang: $LANG.code,
							date: new Date(profileJSON.birthday),
							dateStyle: 'short'
						})}

						({age}
						{$LANG.about.details.age})
					</li>
					<li>
						<Icon icon="briefcase" />
						<span>
							{@html $LANG.about.details.occupation}
						</span>
					</li>
					<li>
						<Icon icon="home" />
						{$LANG.about.details.home}
					</li>
					<li>
						<Icon icon="map-pin" />
						{$LANG.about.details.homeland}
					</li>
				</ul>
			</div>
		</div>

		<div class="facts" in:fly|global={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
			<div class="card-body">
				<h3>{$LANG.about.facts.title}</h3>

				<ul>
					<li>
						<Icon icon="spider-mask" collection="game-icons" />
						{$LANG.about.facts.character}
					</li>
					<li>
						<Icon icon="device-gamepad" />
						{$LANG.about.facts.entertainment}
					</li>
					<li>
						<Icon icon="movie" />
						{$LANG.about.facts.movie}
					</li>
					<li>
						<Icon icon="guitar-pick" />
						{$LANG.about.facts.hobby}
					</li>
					<li>
						<Icon icon="hand-rock" />
						{$LANG.about.facts.music}
					</li>
				</ul>
			</div>
		</div>

		<div class="options" in:fly|global={{ y: 50, duration: 1000, delay: 2900, easing: cubicOut }}>
			{#each routes as route}
				<a href={route.path} class:current={route.path === data.pathname} on:click={scrollToTop}>
					<Icon icon={route.icon} />
					<span>{route.name}</span>
				</a>
			{/each}
		</div>
	</aside>
</section>

<style lang="scss" global>
	code.about {
		@apply md:mt-16;
	}

	section.infos {
		@apply flex min-h-[75vh] flex-col gap-y-4 md:grid md:grid-cols-12 md:gap-8;

		& .info__content {
			@apply relative flex flex-col md:col-span-7 md:flex-row;

			& > .page__transition {
				@apply md:min-w-[36.5rem];
			}
		}

		& aside {
			@apply sticky top-48 mt-16 flex flex-col gap-4 md:col-span-full md:col-start-8 md:m-0 md:self-start;

			& .details,
			& .facts {
				@apply card-bordered card card-compact h-fit shadow-lg backdrop-blur-md backdrop-saturate-200 md:card-normal;

				& figure {
					@apply absolute -top-20 right-0 h-32 w-32 drop-shadow-lg md:h-40 md:w-40;
				}

				& .card-body {
					& h3 {
						@apply mb-4 font-futuristic text-xl text-shadow-rgb md:text-2xl;
					}

					& > ul {
						@apply flex flex-col gap-2;

						& > li {
							@apply flex items-center text-sm;

							& > .icon {
								@apply mr-2 self-start text-primary;
							}

							& a {
								@apply link-hover link-primary;
							}

							& .btn__pronounce {
								@apply btn-outline btn-xs btn-circle btn ml-2 w-6 border-primary p-0 text-primary hover:btn-primary;
							}
						}
					}
				}
			}

			& .details {
				@apply bg-base-300 bg-auto bg-center bg-no-repeat bg-blend-hard-light;
				background-image: var(--low-poly-grid);
			}

			& .facts {
				@apply bg-base-100/75;
			}

			& .options {
				@apply grid grid-flow-col gap-4 md:grid-flow-dense md:grid-cols-2;

				& > a {
					@apply btn flex-1 gap-1 shadow-md lg:hover:shadow-lg;

					&.current {
						@apply btn-primary;
					}

					& > span {
						@apply hidden md:block;
					}
				}
			}
		}
	}

	html.low__end {
		& section.infos {
			& aside {
				& .details {
					@apply bg-base-200 bg-none;
				}
			}
		}
	}
</style>
