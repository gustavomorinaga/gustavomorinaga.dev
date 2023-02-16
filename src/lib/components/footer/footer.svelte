<script lang="ts">
	import { LANG } from '$lib/stores';
</script>

<footer>
	<div>
		<p>{$LANG.footer}</p>

		<span class="powered-by">
			Powered by
			<a class="w-16 mr-1" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
				<img src="/images/svgs/vercel-logo.svg" width="64" height="14" alt="Vercel logotype" />
			</a>
			|
			<a class="w-24" href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">
				<img
					src="/images/svgs/sveltekit-logo.svg"
					width="96"
					height="19"
					alt="SvelteKit logotype"
				/>
			</a>
		</span>
	</div>
</footer>

<style lang="scss">
	footer {
		@apply footer footer-center p-4 bg-black text-base-content border-t border-base-100;

		& > div {
			@apply flex items-center justify-between flex-col md:flex-row max-w-screen-lg w-full;

			& .powered-by {
				@apply flex items-center gap-1;
			}
		}
	}
</style>
