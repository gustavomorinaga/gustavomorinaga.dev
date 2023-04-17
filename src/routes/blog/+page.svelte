<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { flip } from 'svelte/animate';
	import { blur, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { simpleDateFormatter, HOST } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import { goto } from '$app/navigation';
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import type { ICMSData, IPost } from '$lib/ts';

	export let data;

	const { tags, query } = data;
	let { posts } = data;
	let currentPage = Number($page.url.searchParams.get('page')) || 1;

	$: currentTag = (browser && $page.url.searchParams.get('tag')) || 'all';
	$: filteredPosts = posts.data.filter(({ tags }) =>
		currentTag !== 'all' ? tags.some(t => t.name === currentTag) : true
	);

	const handleLoadMore = () => {
		const { searchParams } = $page.url;

		currentPage++;
		searchParams.set('page', currentPage.toString());
		goto('/blog?' + searchParams.toString(), { replaceState: true, noScroll: true });

		return handleFetchPosts();
	};

	const handleFetchPosts = async () => {
		const { searchParams } = $page.url;

		const [response] = await Promise.all([
			fetch(
				`${PUBLIC_CMS_URL}/api/blog-posts?` +
					new URLSearchParams({
						...query.blog,
						'pagination[page]': searchParams.get('page') as string
					}).toString()
			).then<ICMSData<IPost>>(res => res.json())
		]);

		posts.data = [...posts.data, ...response.data];
		posts.meta = response.meta;

		return posts;
	};
</script>

<Metadata title={$LANG.blog.metadata.title} description={$LANG.blog.metadata.description} />

<code class="typewriter blog">profile<span class="method">.blog()</span>;</code>

<div class="blog" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.blog.title}</h1>

	<p>{$LANG.blog.paragraph}</p>

	<div class="blog__layout" in:fly={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}>
		<aside class="filters">
			<!-- <input class="search" type="text" name="term" id="term" placeholder="Pesquisar artigos..." /> -->

			<ul class="menu">
				<li>
					<a href="/blog?tag=all" class:active={currentTag === 'all' || !currentTag}>
						<Icon icon="stack-2" />
						Todos
					</a>
				</li>
				{#each tags.data as tag (tag.id)}
					<li>
						<a href="/blog?tag={tag.name}" class:active={currentTag === tag.name}>
							<Icon icon={tag.icon} collection={tag.collection} />
							{tag.name}
						</a>
					</li>
				{/each}
			</ul>
		</aside>

		<section class="posts">
			<ul in:fly={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
				{#each filteredPosts as post (post.id)}
					<li
						transition:blur={{ easing: cubicOut }}
						animate:flip={{ duration: 300, easing: cubicOut }}
					>
						<a class="post" href="/blog/{post.slug}" style="--cover: url({HOST + post.cover.url});">
							<div class="card-body">
								<h2 use:balancer>{post.title}</h2>

								<footer>
									<div class="author">
										<figure class="avatar">
											<div>
												<img
													src="https://github.com/gustavomorinaga.png"
													alt="Gustavo Morinaga avatar"
												/>
											</div>
										</figure>

										<address>
											<a href="/about" rel="author">Gustavo Morinaga</a>
										</address>

										<time>
											{simpleDateFormatter({
												lang: $LANG.code,
												date: new Date(post.publishedAt)
											})}
										</time>
									</div>

									<ul class="tags">
										{#if post.tags && post.tags?.length}
											{#each post.tags as tag, index}
												{#if index + 1 <= 3}
													<li class="tag">{tag.name}</li>
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
				class="btn btn-wide self-center"
				disabled={posts.meta.pagination.total <= posts.data.length}
				on:click={handleLoadMore}>Carregar mais</button
			>
		</section>
	</div>
</div>

<style lang="scss" global>
	code.blog {
		@apply md:mt-16;
	}

	div.blog {
		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-8;
		}

		& > .blog__layout {
			@apply grid grid-cols-12 gap-y-4 md:gap-8;

			& > aside.filters {
				@apply sticky top-24 col-span-3 self-start flex flex-col gap-4;

				& > input.search {
					@apply input input-bordered;
				}

				& > ul.menu {
					@apply card-bordered rounded-box overflow-hidden bg-base-100/75 shadow-lg backdrop-blur-md;
				}
			}

			& > section.posts {
				@apply col-span-full md:col-start-4 flex flex-col gap-8;

				& > ul {
					@apply flex flex-col gap-4;

					& > li {
						& > a.post {
							@apply z-10 card card-bordered min-h-[10rem] bg-cover bg-center bg-no-repeat shadow-lg transition duration-700 ease-smooth;
							background-image: var(--cover);

							&::before {
								content: '';
								@apply absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-black/60;
							}

							@media (hover: hover) {
								&:hover {
									@apply no-underline border-primary shadow-glow shadow-primary/10;

									& .external {
										@apply opacity-100;
									}
								}
							}

							& .card-body {
								& > h2 {
									@apply text-3xl font-futuristic mb-8 text-shadow-glow shadow-primary;
								}

								& > footer {
									@apply flex justify-between mt-auto;

									& .author {
										@apply flex items-center gap-2;

										& > figure.avatar {
											& > div {
												@apply w-8 rounded-full;
											}
										}

										& address {
											@apply block text-shadow-lg;

											& a {
												@apply font-bold not-italic;
											}
										}

										& time {
											@apply text-gray-400;
										}
									}

									& ul.tags {
										@apply flex items-center gap-2;

										& > li.tag {
											@apply badge badge-lg shadow-lg;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
