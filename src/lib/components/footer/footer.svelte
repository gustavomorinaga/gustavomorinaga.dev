<script lang="ts">
	import { IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
</script>

<footer id="footer">
	<div class="footer__wrapper">
		<div>
			<p>{$LANG.footer.developedBy}</p>

			<span class="powered-by">
				{$LANG.footer.poweredBy}
				<a class="deploy" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
					<img src={IMAGES_SVG.logoVercel} width="64" height="14" alt="Vercel logotype" />
				</a>
				|
				<a
					class="framework"
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={IMAGES_SVG.logoSvelteKit} width="96" height="19" alt="SvelteKit logotype" />
				</a>
			</span>
		</div>
	</div>

	<div id="player-offset" />
</footer>

<style lang="scss">
	#footer {
		@apply relative z-20 block border-t border-base-100 bg-black;

		& .footer__wrapper {
			@apply footer footer-center p-4 text-xs text-base-content md:text-sm;

			& > div {
				@apply flex w-full max-w-screen-lg flex-col items-center justify-between md:flex-row;

				& .powered-by {
					@apply flex items-center gap-1;

					& > a.deploy {
						@apply mr-1 w-12 md:w-16;
					}
					& > a.framework {
						@apply w-20 md:w-24;
					}
				}
			}
		}

		& #player-offset {
			@apply block h-0 w-screen;
		}
	}
</style>
