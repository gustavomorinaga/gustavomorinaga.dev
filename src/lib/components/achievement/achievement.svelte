<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ACHIEVEMENTS } from '$lib/stores';
	import Portal from 'svelte-portal';

	import { IMAGES_SVG } from '$lib/images';

	const TRANSITION_CONFIG: FlyParams = { y: 50, duration: 300, easing: cubicOut };
</script>

<Portal>
	<ul class="achievements">
		{#each $ACHIEVEMENTS as { title, description, xp }}
			<li transition:fly={TRANSITION_CONFIG}>
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
						<header>
							<h4>{title}</h4>
							<span class="xp">
								<strong>{xp}</strong>
								XP
							</span>
						</header>

						<p>{description}</p>
					</div>
				</section>
			</li>
		{/each}
	</ul>
</Portal>

<style lang="scss" global>
	ul.achievements {
		@apply fixed z-50 left-0 right-0 bottom-8 flex flex-col-reverse items-center gap-2;

		& > li {
			@apply w-fit;

			& .achievement {
				@apply card card-compact card-side card-bordered w-full md:w-fit overflow-hidden bg-base-100/50 border-x-0 border-b-0 md:border border-primary backdrop-blur-md shadow-glow shadow-primary/10;

				& figure {
					@apply pl-2 aspect-square;
				}

				& .card-body {
					@apply w-0 pl-2 pr-0 opacity-0;
					animation: achievement_content--open 3.5s ease-out,
						achievement_content--close 1s ease-out 3.5s;

					& header {
						@apply card-title font-normal;

						& h4 {
							@apply pr-8 truncate font-futuristic text-shadow-glow shadow-primary;
						}

						& .xp {
							@apply absolute top-2 right-2 badge badge-ghost text-xs text-primary;

							& strong {
								@apply text-base-content text-base mr-1;
							}
						}
					}

					& p {
						@apply truncate;
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
			@apply w-96 px-2 opacity-100;
		}
	}

	@keyframes achievement_content--close {
		from,
		50% {
			@apply w-96 px-2 opacity-100;
		}
		to {
			@apply w-0 pl-2 pr-0 opacity-0;
		}
	}
</style>
