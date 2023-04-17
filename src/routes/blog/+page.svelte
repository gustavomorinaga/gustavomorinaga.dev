<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Metadata } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { simpleDateFormatter, HOST } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';

	export let data;

	const { tags } = data;

	$: tag = (browser && $page.url.searchParams.get('tag')) || 'all';
	$: posts = data.posts.data.filter(({ tags }) =>
		tag !== 'all' ? tags.some(t => t.name === tag) : true
	);
</script>

<Metadata title={$LANG.blog.metadata.title} description={$LANG.blog.metadata.description} />

<code class="typewriter blog">profile<span class="method">.blog()</span>;</code>

<div class="blog" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.blog.title}</h1>

	<p>{$LANG.blog.paragraph}</p>

	<div class="blog__layout" in:fly={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}>
		<aside class="filters">
			<ul class="menu">
				<li>
					<a href="/blog?tag=all" class:active={tag === 'all' || !tag}>Todos</a>
				</li>
				{#each tags.data as { name }}
					<li>
						<a href="/blog?tag={name}" class:active={tag === name}>{name}</a>
					</li>
				{/each}
			</ul>
		</aside>

		<ul class="posts" in:fly={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
			{#each posts as { title, slug, cover, tags, publishedAt }}
				<li>
					<a class="post" href="/blog/{slug}" style="--cover: url({HOST + cover.url});">
						<div class="card-body">
							<h2 use:balancer>{title}</h2>

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
											date: new Date(publishedAt)
										})}
									</time>
								</div>

								<ul class="tags">
									{#if tags && tags?.length}
										{#each tags as tag}
											<li class="tag">{tag.name}</li>
										{/each}
									{/if}
								</ul>
							</footer>
						</div>
					</a>
				</li>
			{/each}
		</ul>
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
				@apply sticky top-24 col-span-3 self-start;

				& > ul.menu {
					@apply card-bordered rounded-box overflow-hidden bg-base-100/75 shadow-lg backdrop-blur-md;

					& > li {
						& > button {
						}
					}
				}
			}

			& > ul {
				@apply col-span-full md:col-start-4 flex flex-col gap-4;

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
</style>
