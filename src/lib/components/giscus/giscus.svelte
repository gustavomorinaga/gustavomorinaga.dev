<script lang="ts">
	import { onMount } from 'svelte';
	import type { GiscusWidget } from 'giscus';

	export let id: GiscusWidget['id'];
	export let host: GiscusWidget['host'] = 'https://giscus.app';
	export let repo: GiscusWidget['repo'];
	export let repoId: GiscusWidget['repoId'];
	export let category: GiscusWidget['category'];
	export let categoryId: GiscusWidget['categoryId'];
	export let mapping: GiscusWidget['mapping'] = 'pathname';
	export let term: GiscusWidget['term'] = '';
	export let strict: GiscusWidget['strict'] = '0';
	export let reactionsEnabled: GiscusWidget['reactionsEnabled'] = '1';
	export let emitMetadata: GiscusWidget['emitMetadata'] = '0';
	export let inputPosition: GiscusWidget['inputPosition'] = 'bottom';
	export let theme: GiscusWidget['theme'] = 'light';
	export let lang: GiscusWidget['lang'] = 'en';
	export let loading: GiscusWidget['loading'] = 'eager';

	let mounted = false;

	onMount(() => {
		mounted = true;
		import('giscus');
	});
</script>

{#if mounted}
	<giscus-widget
		{id}
		{host}
		{repo}
		repoid={repoId}
		{category}
		categoryid={categoryId}
		{mapping}
		{term}
		{strict}
		reactionsenabled={reactionsEnabled}
		emitmetadata={emitMetadata}
		inputposition={inputPosition}
		{theme}
		{lang}
		{loading}
	/>
{/if}
