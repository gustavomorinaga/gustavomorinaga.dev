<script lang="ts">
	import { PUBLIC_DOMAIN, PUBLIC_GTM_ID } from '$env/static/public';
</script>

<svelte:head>
	{@html `
		<script>
			partytown = {
				forward: ['dataLayer.push'],
				resolveUrl: url => {
					const siteUrl = '${PUBLIC_DOMAIN}/proxytown';

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

	<script src="/~partytown/partytown.js"></script>

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
