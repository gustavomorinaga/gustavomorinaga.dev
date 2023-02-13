<script lang="ts">
	import { LANG } from '$lib/stores';
</script>

<footer>
	<div>
		<p>{$LANG.footer}</p>
	</div>
</footer>

<style lang="scss">
	footer {
		@apply footer footer-center p-4 bg-black text-base-content;
	}
</style>
