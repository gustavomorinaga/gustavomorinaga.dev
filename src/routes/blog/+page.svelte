<script lang="ts">
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import { blur } from 'svelte/transition';
	import { Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { simpleDateFormatter, HOST, estimateReadingTime } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import type { ICMSData, IPost } from '$lib/ts';

	export let data;

	const { query } = data;
	let { posts } = data;
	let currentPage = 1;

	const handleLoadMore = async () => {
		currentPage++;

		const [response] = await Promise.all([
			fetch(
				`${PUBLIC_CMS_URL}/api/blog-posts?` +
					new URLSearchParams({
						...query.blog,
						'pagination[page]': currentPage.toString()
					}).toString()
			).then<ICMSData<IPost>>(res => res.json())
		]);

		posts.data = [...posts.data, ...response.data];
		posts.meta = response.meta;

		return posts;
	};
</script>

<Metadata title={$LANG.blog.metadata.title} description={$LANG.blog.metadata.description} />

<ul class="posts__list">
	{#each posts.data as post (post.id)}
		<li in:blur={{ duration: 300 }}>
			<a class="post" href="/blog/{post.slug}" style="--cover: url({HOST + post.cover.url});">
				<div class="card-body">
					<h2 use:balancer>{post.title}</h2>

					<footer>
						<div class="author">
							<figure class="avatar">
								<div>
									<img src="https://github.com/gustavomorinaga.png" alt="Gustavo Morinaga avatar" />
								</div>
							</figure>

							<div>
								<address>
									<a href="/about" rel="author">Gustavo Morinaga</a>
								</address>

								<span>
									<time>
										{simpleDateFormatter({
											lang: $LANG.code,
											date: new Date(post.publishedAt)
										})}
									</time>
									•
									<time>{estimateReadingTime(post.content)} min</time>
								</span>
							</div>
						</div>

						<ul class="tags">
							{#if post.tags && post.tags?.length}
								{#each post.tags as tag, index}
									{#if index + 1 <= 3}
										<li class="tag">{tag.label}</li>
									{/if}
								{/each}
							{/if}
						</ul>
					</footer>
				</div>
			</a>
		</li>
	{/each}
</ul>

<button
	class="btn btn-wide mx-auto"
	disabled={posts.meta.pagination.total <= posts.data.length}
	on:click={handleLoadMore}
>
	{$LANG.blog.loadMore}
</button>
