<script lang="ts">
	import { dev } from '$app/environment';
	import { inject as injectAnalytics } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
</script>
