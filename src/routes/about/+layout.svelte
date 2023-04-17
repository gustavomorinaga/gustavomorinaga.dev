<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, PageTransition } from '$lib/components';
	import { IMAGES_WEBP, IMAGES_SVG } from '$lib/images';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';
	import { dateFormatter, getAge, scrollToTop, speakText } from '$lib/utils';

	export let data;

	const age = getAge(profileJSON.birthday);

	const handleSpeech = () => speakText('Gustavo Morinaga', 'pt-BR');
</script>

<code class="typewriter about">
	profile.
	<span class="method">
		{data.pathname.split('/').at(-1)}()
	</span>;
</code>

<section class="infos">
	<div class="info__content" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
		<PageTransition trigger={data.pathname}>
			<slot />
		</PageTransition>
	</div>

	<aside>
		<div
			class="details"
			style="--low-poly-grid: url({IMAGES_SVG.bgLowPolyGrid})"
			in:fly={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}
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
						{dateFormatter({ lang: $LANG.code, date: new Date(profileJSON.birthday) })}

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

		<div class="facts" in:fly={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
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

		<div class="options" in:fly={{ y: 50, duration: 1000, delay: 2900, easing: cubicOut }}>
			<a class="cta" href="/about/knowledge" on:click={scrollToTop}>
				<Icon icon="topology-full" />
				{$LANG.about.actions.knowledge}
			</a>

			<a href="/about/setup" data-tip={$LANG.about.actions.setup} on:click={scrollToTop}>
				<Icon icon="devices-pc" />
			</a>

			<a href="/about" data-tip={$LANG.about.actions.about} on:click={scrollToTop}>
				<Icon icon="info-circle" />
			</a>
		</div>
	</aside>
</section>

<style lang="scss" global>
	code.about {
		@apply md:mt-16;
	}

	section.infos {
		@apply grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 min-h-[75vh];

		& .info__content {
			@apply relative flex flex-col md:flex-row md:col-span-7;

			& > .page__transition {
				@apply md:min-w-[36.5rem];
			}
		}

		& aside {
			@apply sticky top-48 self-start col-span-full md:col-start-8 flex flex-col gap-4 mt-16 md:m-0;

			& .details,
			& .facts {
				@apply card card-bordered card-compact md:card-normal h-fit shadow-lg backdrop-blur-md;

				& figure {
					@apply absolute -top-20 right-0 w-40 h-40 drop-shadow-lg;
				}

				& .card-body {
					& h3 {
						@apply text-2xl font-futuristic text-shadow-rgb mb-4;
					}

					& > ul {
						@apply flex flex-col gap-2;

						& > li {
							@apply flex items-center text-sm;

							& > .icon {
								@apply text-primary mr-2;
							}

							& a {
								@apply link-primary link-hover;
							}

							& .btn__pronounce {
								@apply btn btn-outline btn-circle btn-xs w-6 p-0 ml-2 text-primary border-primary hover:btn-primary;
							}
						}
					}
				}
			}

			& .details {
				@apply bg-base-300 bg-auto bg-no-repeat bg-center bg-blend-hard-light;
				background-image: var(--low-poly-grid);
			}

			& .facts {
				@apply bg-base-100/75;
			}

			& .options {
				@apply flex gap-4;

				& > a {
					@apply btn shadow-md  lg:hover:shadow-lg;

					&.cta {
						@apply flex-grow btn-primary gap-2;
					}

					&:not(.cta) {
						@apply tooltip tooltip-bottom inline-flex;
					}
				}
			}
		}
	}

	html.low__end {
		& .infos {
			& aside {
				& .details {
					@apply bg-base-200 bg-none;
				}
			}
		}
	}
</style>
