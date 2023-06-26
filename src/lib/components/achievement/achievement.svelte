<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { IMAGES_SVG } from '$lib/images';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import Portal from 'svelte-portal';

	const TRANSITION_CONFIG: FlyParams = { y: 50, duration: 300, easing: cubicOut };
</script>

<Portal>
	<ul class="achievements">
		{#each $ACHIEVEMENTS as { _id, xp }}
			<li transition:fly|global={TRANSITION_CONFIG}>
				<section class="achievement">
					<figure>
						<img
							src={IMAGES_SVG.iconTrophy}
							alt="Icon by Raj Dev on freeicons.io"
							width="64"
							height="64"
							loading="lazy"
						/>
					</figure>

					<div class="card-body">
						<h1>{$LANG.achievements[_id].title}</h1>

						<div class="description">
							<span class="xp">
								<strong>{xp}</strong>
								XP
							</span>
							<p>{$LANG.achievements[_id].description}</p>
						</div>
					</div>
				</section>
			</li>
		{/each}
	</ul>
</Portal>

<style lang="scss" global>
	ul.achievements {
		@apply fixed bottom-0 left-0 right-0 z-50 flex flex-col-reverse items-center gap-2 md:bottom-8 md:mx-4;

		& > li {
			@apply w-full md:w-fit;

			& .achievement {
				@apply card-bordered card card-side card-compact w-full overflow-hidden border-x-0 border-b-0 border-primary bg-base-100/75 shadow-glow shadow-primary/10 backdrop-blur-md md:w-fit md:border;

				& figure {
					@apply aspect-square pl-2;

					& img {
						@apply h-12 w-12 md:h-16 md:w-16;
					}
				}

				& .card-body {
					@apply pl-2 md:w-0 md:pr-0 md:opacity-0;

					@media (min-width: 768px) {
						animation: achievement_content--open 3.5s ease-out,
							achievement_content--close 1s ease-out 3.5s;
					}

					& h1 {
						@apply truncate font-futuristic text-lg shadow-primary text-shadow-glow;
					}

					& .description {
						@apply flex items-center gap-2;

						& .xp {
							@apply badge badge-ghost text-xs text-primary;

							& strong {
								@apply mr-1 text-base-content;
							}
						}

						& p {
							@apply truncate text-base;
						}
					}
				}
			}
		}
	}

	@keyframes achievement_content--open {
		from,
		15% {
			@apply w-0 pl-2 pr-0 opacity-0;
		}
		30%,
		to {
			@apply w-[28rem] px-2 opacity-100;
		}
	}

	@keyframes achievement_content--close {
		from,
		50% {
			@apply w-[28rem] px-2 opacity-100;
		}
		to {
			@apply w-0 pl-2 pr-0 opacity-0;
		}
	}
</style>
