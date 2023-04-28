<script lang="ts">
	import { blur } from 'svelte/transition';
	import { CardPost, CarouselFeaturedPosts, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import type { ICMSData, IPost } from '$lib/ts';

	export let data;

	const { posts, featured } = data;
	let currentPage = 1;

	const handleLoadMore = async () => {
		currentPage++;

		const [response] = await Promise.all([
			fetch(`/api/posts?page=${currentPage}}`).then<ICMSData<IPost[]>>(res => res.json())
		]);

		posts.data = [...posts.data, ...response.data];
		posts.meta = response.meta;

		return posts;
	};
</script>

<Metadata title={$LANG.blog.metadata.title} description={$LANG.blog.metadata.description} />

<CarouselFeaturedPosts slides={featured.data} />

<div class="divider" />

<h2>{$LANG.blog.latest}</h2>

<ul class="posts__list">
	{#each posts.data as post (post.id)}
		<li in:blur={{ duration: 300 }}>
			<CardPost {post} />
		</li>
	{/each}
</ul>

<button
	class="btn__fetch"
	disabled={posts.meta.pagination.total <= posts.data.length}
	on:click={handleLoadMore}
>
	{$LANG.blog.loadMore}
</button>
