<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/scripts';
	import { inject } from '@vercel/analytics';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;

	$: if (browser && analyticsId)
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});

	inject({ mode: dev ? 'development' : 'production' });
</script>
