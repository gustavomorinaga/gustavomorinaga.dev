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
			<li transition:fly={TRANSITION_CONFIG}>
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
		@apply fixed z-50 top-0 md:top-24 right-0 md:right-8 flex flex-col-reverse gap-2;

		& .notification {
			@apply card card-compact card-bordered max-w-full md:max-w-sm bg-base-100/50 border-x-0 border-b-0 md:border backdrop-blur-md shadow-lg transition-all duration-300 ease-out;

			& .card-body {
				& header {
					@apply card-title font-normal;

					& .icon {
						@apply text-primary;
					}

					& h4 {
						@apply font-futuristic text-shadow-glow shadow-primary;
					}
				}
			}
		}
	}
</style>
