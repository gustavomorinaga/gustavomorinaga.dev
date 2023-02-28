<script lang="ts">
	import { LANG } from '$lib/stores';

	import vercelSVG from '$lib/images/svgs/logo-vercel.svg';
	import sveltekitSVG from '$lib/images/svgs/logo-sveltekit.svg';
</script>

<footer id="footer">
	<div class="footer__wrapper">
		<div>
			<p>{$LANG.footer}</p>

			<span class="powered-by">
				Powered by
				<a class="w-16 mr-1" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
					<img src={vercelSVG} width="64" height="14" alt="Vercel logotype" />
				</a>
				|
				<a class="w-24" href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">
					<img src={sveltekitSVG} width="96" height="19" alt="SvelteKit logotype" />
				</a>
			</span>
		</div>
	</div>

	<div id="player-offset" />
</footer>

<style lang="scss">
	#footer {
		@apply bg-black border-t border-base-100;

		& .footer__wrapper {
			@apply footer footer-center p-4 text-base-content;

			& > div {
				@apply flex items-center justify-between flex-col md:flex-row max-w-screen-lg w-full;

				& .powered-by {
					@apply flex items-center gap-1;
				}
			}
		}

		& #player-offset {
			@apply block w-screen h-0;
		}
	}
</style>
