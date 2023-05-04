<script lang="ts">
	import { page } from '$app/stores';
	import { LANG } from '$lib/stores';
	import { IMAGES_WEBP } from '$lib/images';
	import { baseURL } from '$lib/utils';

	export let title = '';
	export let description = $LANG.metadata.description;
	export let thumbnail = IMAGES_WEBP.previewPortfolio;
	export let thumbnailIsExternal = false;

	$: pageTitle = title ? `${title} » ${$LANG.metadata.title}` : `${$LANG.metadata.title}`;
	$: thumbnailURL = thumbnailIsExternal ? thumbnail : `${baseURL}${thumbnail}`;
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
	<meta property="og:image" content={thumbnailURL} />
	<meta property="og:image:type" content="image/jpg" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{baseURL}{$page.url.pathname}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={thumbnailURL} />

	<slot />
</svelte:head>
