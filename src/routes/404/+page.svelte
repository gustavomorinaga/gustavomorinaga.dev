<script lang="ts">
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';

	import { IMAGES_SVG } from '$lib/images';
</script>

<Metadata title="Not found" description={$LANG.error.paragraph} />

<section class="hero">
	<div class="hero-content gap-8">
		<div>
			<div class="window" style="--low-poly-grid: url({IMAGES_SVG.bgLowPolyGrid})">
				<span class="window__content">
					<Icon icon="alert-octagon" size="xl" />
					404: Not found
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

<style lang="scss" global>
	.hero {
		@apply min-h-[75vh];

		& .hero-content {
			@apply max-w-none w-full flex-col md:flex-row-reverse justify-between;

			& .window {
				@apply mockup-window bg-base-100 border border-base-200 md:animate-float;

				& .window__content {
					@apply grid place-items-center w-80 h-40 md:w-96 md:h-48 p-4 font-futuristic bg-base-200 bg-cover bg-no-repeat bg-center bg-blend-hard-light border-t border-base-200 text-error;
					background-image: var(--low-poly-grid);
				}
			}

			& > div {
				@apply relative;

				&::before {
					content: '';
					@apply absolute -z-10 inset-0 rounded-2xl bg-black/50 blur-xl;
				}

				& h1 {
					@apply text-5xl font-futuristic text-shadow-rgb mb-4;
				}

				& p {
					@apply text-2xl mb-16;
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
