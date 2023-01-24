<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_GTM_ID } from '$env/static/public';
	import { partytownSnippet } from '@builder.io/partytown/integration';

	let script: HTMLScriptElement;
	const { origin } = $page.url;

	onMount(() => {
		if (script) script.textContent = partytownSnippet();
	});
</script>

<svelte:head>
	{@html `
		<script>
			partytown = {
				forward: ['dataLayer.push'],
				resolveUrl: url => {
					console.log(url);

					const siteUrl = '${origin}/proxytown';

					if (url.hostname.includes('googletagmanager.com')) {
						const proxyUrl = new URL(siteUrl + '/gtm');

						const gtmId = new URL(url).searchParams.get('id');
						gtmId && proxyUrl.searchParams.append('id', gtmId);

						return proxyUrl;
					}

					if (url.hostname.includes('google-analytics.com')) {
						const proxyUrl = new URL(siteUrl + '/ga');

						return proxyUrl;
					}

					return url;
				}
			};
		</script>
	`}

	<script bind:this={script}></script>

	<script
		type="text/partytown"
		src={`https://googletagmanager.com/gtag/js?id=${PUBLIC_GTM_ID}`}
	></script>

	{@html `
		<script type="text/partytown">
			window.dataLayer = window.dataLayer || [];

			window.gtag = function gtag() {
				window.dataLayer.push(arguments);
			}

			gtag('js', new Date());
			gtag('config', '${PUBLIC_GTM_ID}', {
				page_path: window.location.pathname
			});
		</script>
	`}
</svelte:head>
