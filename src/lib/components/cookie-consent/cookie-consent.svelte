<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import { COOKIE_CONSENT } from '$lib/stores';
	import Portal from 'svelte-portal';

	const TRANSITION_CONFIG: FlyParams = { x: -100, duration: 300, easing: cubicOut };

	const handleConsent = () => COOKIE_CONSENT.set({ accepted: true });
</script>

{#if !$COOKIE_CONSENT.accepted}
	<Portal>
		<section id="cookie-consent" transition:fly={TRANSITION_CONFIG}>
			<div class="card-body">
				<header>
					<Icon icon="cookie" />

					<h4>Cookies</h4>
				</header>

				<p>
					This website uses cookies and similar technologies to improve your browsing experience.
				</p>

				<div class="card-actions">
					<button class="cta" on:click={handleConsent}>Accept</button>
				</div>
			</div>
		</section>
	</Portal>
{/if}

<style lang="scss" global>
	section#cookie-consent {
		@apply fixed left-8 bottom-20 card card-compact card-bordered max-w-sm bg-base-100/50 backdrop-blur-md shadow-lg shadow-black;

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

			& .card-actions {
				& .cta {
					@apply btn btn-block btn-primary btn-sm;
				}
			}
		}
	}
</style>
