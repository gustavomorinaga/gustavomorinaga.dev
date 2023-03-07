<script lang="ts">
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import { page } from '$app/stores';
	import { LANG } from '$lib/stores';
	import { IMAGES_WEBP } from '$lib/images';

	export let title = '';
	export let description = $LANG.metadata.description;
	export let thumbnail = IMAGES_WEBP.previewPortfolio;

	const baseURL = PUBLIC_DOMAIN;

	$: pageTitle = title ? `${title} » ${$LANG.metadata.title}` : `${$LANG.metadata.title}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#100F10" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{baseURL}{$page.url.pathname}" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{baseURL}{thumbnail}" />
	<meta property="og:image" content="{baseURL}{thumbnail}" />
	<meta property="og:image:type" content="image/png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{baseURL}{$page.url.pathname}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content="{baseURL}{thumbnail}" />
</svelte:head>
