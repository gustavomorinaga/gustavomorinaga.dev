<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import { COOKIE_CONSENT, LANG } from '$lib/stores';
	import Portal from 'svelte-portal';

	const TRANSITION_CONFIG: FlyParams = { y: 50, duration: 300, easing: cubicOut };

	const handleConsent = () => COOKIE_CONSENT.set({ accepted: true });
</script>

{#if !$COOKIE_CONSENT.accepted}
	<Portal>
		<section id="cookie-consent" transition:fly={TRANSITION_CONFIG}>
			<div class="card-body">
				<header>
					<Icon icon="cookie" />

					<h4>{$LANG.cookieConsent.title}</h4>
				</header>

				<p>{$LANG.cookieConsent.paragraph}</p>

				<div class="card-actions">
					<button class="cta" on:click={handleConsent}>{$LANG.cookieConsent.confirm}</button>
				</div>
			</div>
		</section>
	</Portal>
{/if}

<style lang="scss" global>
	section#cookie-consent {
		@apply fixed z-50 left-0 right-0 bottom-0 md:left-8 md:bottom-20 card card-compact card-bordered max-w-full md:max-w-sm bg-base-100/50 border-x-0 border-b-0 md:border backdrop-blur-md shadow-lg transition-all duration-300 ease-out;

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
