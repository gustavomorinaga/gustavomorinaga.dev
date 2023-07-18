<script lang="ts">
	import { page } from '$app/stores';
	import { Icon, Metadata } from '$lib/components';
	import { IMAGES_SVG } from '$lib/images';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		ACHIEVEMENTS.unlock('GMD_404');
	});
</script>

<Metadata title={$page.error?.message} description={$LANG.error.paragraph} />

{#if $page.error}
	<section class="hero">
		<div class="hero-content gap-8">
			<div>
				<div class="window" style="--low-poly-grid: url({IMAGES_SVG.bgLowPolyGrid})">
					<span class="window__content">
						<Icon icon="alert-octagon" size="xl" />
						{$page.status}: {$page.error?.message}
					</span>
				</div>
			</div>

			<div>
				<h1>{$LANG.error.title}</h1>

				<p>{$LANG.error.paragraph}</p>

				<nav>
					<a href="/">
						<Icon icon="chevron-left" />
						{$LANG.error.return}
					</a>
				</nav>
			</div>
		</div>
	</section>
{/if}

<style lang="scss" global>
	.hero {
		@apply min-h-[75vh];

		& .hero-content {
			@apply w-full max-w-none flex-col justify-between md:flex-row-reverse;

			& .window {
				@apply mockup-window border border-base-200 bg-base-100 md:animate-float;

				& .window__content {
					@apply grid h-40 w-80 place-items-center border-t border-base-200 bg-base-200 bg-cover bg-center bg-no-repeat p-4 font-futuristic text-error bg-blend-hard-light md:h-48 md:w-96;
					background-image: var(--low-poly-grid);
				}
			}

			& > div {
				@apply relative;

				&::before {
					content: '';
					@apply absolute inset-0 -z-10 rounded-2xl bg-black/50 blur-xl;
				}

				& h1 {
					@apply mb-4 font-futuristic text-5xl text-shadow-rgb;
				}

				& p {
					@apply mb-16 text-2xl;
				}

				& nav {
					@apply flex gap-2;

					& a {
						@apply btn btn-primary btn-block md:btn-wide;

						&:hover {
							& .icon {
								@apply -translate-x-1;
							}
						}

						& .icon {
							@apply transition-transform duration-300 ease-out;
						}
					}
				}
			}
		}
	}
</style>
