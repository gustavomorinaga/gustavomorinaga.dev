<script lang="ts">
	import { PageTransition } from '$lib/components';

	export let data;
</script>

<PageTransition goTop trigger={data.pathname}>
	<slot />
</PageTransition>
