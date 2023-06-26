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
		<section id="cookie-consent" transition:fly|global={TRANSITION_CONFIG}>
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
		@apply card-bordered card card-compact fixed bottom-0 left-0 right-0 z-50 max-w-full border-x-0 border-b-0 bg-base-100/75 shadow-lg backdrop-blur-md transition-all duration-300 ease-out md:bottom-20 md:left-8 md:max-w-sm md:border;

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

			& .card-actions {
				& .cta {
					@apply btn-primary btn-block btn-sm btn;
				}
			}
		}
	}
</style>
