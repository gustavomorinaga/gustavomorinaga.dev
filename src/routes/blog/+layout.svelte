<script lang="ts">
	import { PageTransition } from '$lib/components';

	export let data;
</script>

<PageTransition goToTop trigger={data.pathname}>
	<slot />
</PageTransition>
