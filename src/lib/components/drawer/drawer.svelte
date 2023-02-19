<script lang="ts">
	import { browser } from '$app/environment';
	import { DRAWER } from '$lib/stores';
	import { containerElement } from '$lib/utils';
	import { onMount } from 'svelte';

	let bodyRef: HTMLElement;

	$: if (browser && bodyRef) bodyRef.classList.toggle('overflow-hidden', $DRAWER);

	onMount(() => {
		bodyRef = containerElement as HTMLElement;
	});
</script>

<div class="drawer" class:show={$DRAWER}>
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={$DRAWER} />

	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />

		<div class="drawer-side-content">
			<slot name="content" />
		</div>
	</div>
</div>

<style lang="scss" global>
	.drawer {
		@apply fixed inset-0 z-[90] pointer-events-none;

		&.show {
			@apply pointer-events-auto;

			& .drawer-side {
				& .drawer-side-content {
					@apply translate-y-0;
				}
			}
		}

		& .drawer-side {
			overflow: hidden !important;

			& .drawer-overlay {
				@apply bg-black/50 backdrop-blur-sm;
			}

			& .drawer-side-content {
				@apply h-fit translate-y-full mt-auto mx-2 p-4 overflow-hidden bg-base-100 border-t border-base-200 rounded-t-lg shadow-lg shadow-black;
				--tw-translate-x: 0px !important;
			}
		}
	}

	html.low__end {
		& .drawer-overlay {
			--tw-backdrop-blur: blur(0) !important;
		}
	}
</style>
