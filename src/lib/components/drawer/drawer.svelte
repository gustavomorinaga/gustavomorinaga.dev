<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { DRAWER } from '$lib/stores';
	import { containerElement } from '$lib/utils';
	import Portal from 'svelte-portal';

	let bodyRef: HTMLElement;

	export let target: HTMLElement | string = 'body';

	$: if (browser && bodyRef) bodyRef.classList.toggle('overflow-hidden', $DRAWER);

	onMount(() => {
		bodyRef = containerElement as HTMLElement;
	});
</script>

<Portal {target}>
	<div class="drawer" class:show={$DRAWER}>
		<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={$DRAWER} />

		<div class="drawer-side">
			<label for="drawer" class="drawer-overlay" />

			<div class="drawer-side-content">
				<slot name="content" />
			</div>
		</div>
	</div>
</Portal>

<style lang="scss" global>
	.drawer {
		@apply fixed inset-0 z-[90] pointer-events-none;

		&.show {
			@apply pointer-events-auto;

			& .drawer-side {
				& .drawer-overlay {
					@apply opacity-100;
				}

				& .drawer-side-content {
					@apply translate-y-0;
				}
			}
		}

		& .drawer-side {
			@apply visible justify-items-stretch;
			overflow: hidden !important;

			& > * {
				@apply col-start-1 row-start-1;
			}

			& .drawer-overlay {
				@apply sticky inset-y-0 place-self-stretch bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-500 ease-out;
			}

			& .drawer-side-content {
				@apply h-fit translate-y-full mt-auto mx-4 p-4 overflow-hidden bg-base-100 border border-b-0 border-base-200 rounded-t-lg shadow-lg
					transition-transform duration-500 ease-smooth;
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
