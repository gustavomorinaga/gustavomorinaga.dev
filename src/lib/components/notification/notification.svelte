<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import { NOTIFICATIONS } from '$lib/stores';
	import Portal from 'svelte-portal';

	const TRANSITION_CONFIG: FlyParams = { x: 50, duration: 300, easing: cubicOut };
</script>

<Portal>
	<ul class="notifications">
		{#each $NOTIFICATIONS as { title, description, icon, collection, size }}
			<li transition:fly|global={TRANSITION_CONFIG}>
				<section class="notification">
					<div class="card-body">
						<header>
							<Icon {icon} collection={collection || 'tabler'} size={size || 'md'} />

							<h4>{title}</h4>
						</header>

						<p>{description}</p>
					</div>
				</section>
			</li>
		{/each}
	</ul>
</Portal>

<style lang="scss" global>
	.notifications {
		@apply fixed right-0 top-0 z-50 flex flex-col-reverse gap-2 md:right-8 md:top-24;

		& .notification {
			@apply card-bordered card card-compact max-w-full border-x-0 border-b-0 bg-base-100/75 shadow-lg backdrop-blur-md backdrop-saturate-200 transition-all duration-300 ease-out md:max-w-sm md:border;

			& .card-body {
				& header {
					@apply card-title font-normal;

					& .icon {
						@apply text-primary;
					}

					& h4 {
						@apply font-futuristic shadow-primary text-shadow-glow;
					}
				}
			}
		}
	}
</style>
