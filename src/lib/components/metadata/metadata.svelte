<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_DOMAIN } from '$env/static/public';

	export let title = '';
	export let description =
		'Desenvolvedor full-stack criativo e apaixonado em criar soluções completas, eficientes e de alta tecnologia.';
	export let thumbnail = '';

	const baseURL = PUBLIC_DOMAIN;

	$: pageTitle = title ? `${title} » Gustavo Morinaga` : 'Gustavo Morinaga';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#100F10" />

	<meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
	<meta prefix="og: http://ogp.me/ns#" property="og:url" content="{baseURL}{$page.url.pathname}" />
	<meta prefix="og: http://ogp.me/ns#" property="og:title" content={pageTitle} />
	<meta prefix="og: http://ogp.me/ns#" property="og:description" content={description} />
	<meta prefix="og: http://ogp.me/ns#" property="og:image" content="{baseURL}{thumbnail}" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{baseURL}{$page.url.pathname}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content="{baseURL}{thumbnail}" />
</svelte:head>
