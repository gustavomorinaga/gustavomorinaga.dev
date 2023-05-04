<script lang="ts">
	import {
		PUBLIC_CATEGORY_ID,
		PUBLIC_REPO,
		PUBLIC_REPO_ID,
		PUBLIC_USERNAME
	} from '$env/static/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { CardNewsletter, Giscus, Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { HOST, dateFormatter, dateIsValid, scrollIntoView } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import qs from 'qs';
	import type { ICMSData, IPost } from '$lib/ts';

	export let data;
	const { post } = data;

	const TAG_LIMIT = 5;
	const ROOT_PATHNAME = '/blog';
	const POST_PATHNAME = '/blog/[slug]';
	const shareableData = {
		title: post.title,
		text: post.description,
		url: $page.url.href
	};
	let previousPathname = ROOT_PATHNAME;
	let relatedPosts: IPost[];

	$: canShare = browser && navigator.canShare && navigator.canShare(shareableData);

	const registerView = async () => {
		let postView = post?.postViews?.at(0);
		if (!postView) return;

		await fetch(`/api/posts/${post.slug}/view`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: postView.id })
		});
	};

	afterNavigate(({ from }) => {
		const isPostPathname = from?.route.id?.includes(POST_PATHNAME);

		previousPathname = !isPostPathname ? from?.url.pathname || previousPathname : ROOT_PATHNAME;
	});

	const sharePost = async () => await navigator.share(shareableData);

	const loadRelatedPosts = async () => {
		const query = {
			tags: post.tags.map(t => t.value)
		};

		relatedPosts = await fetch(
			`/api/posts/${post.slug}/related?${qs.stringify(query, {
				encodeValuesOnly: true,
				arrayFormat: 'repeat'
			})}`
		)
			.then<ICMSData<IPost[]>>(res => res.json())
			.then(res => res.data);

		return relatedPosts;
	};

	onMount(async () => {
		await Promise.all([loadRelatedPosts(), registerView()]);

		scrollIntoView($page.url.hash);
	});
</script>

<Metadata title={post.title} description={post.description} thumbnail={post.cover.url} />

<article class="post">
	<header style="--cover: url({HOST + post.cover.url});">
		<div class="wrapper">
			<a class="btn__previous" href={previousPathname}>
				<Icon icon="arrow-left" size="sm" />

				{$LANG.post.goBack}
			</a>

			<div>
				<h1 use:balancer>{post.title}</h1>
				<p use:balancer>{post.subtitle}</p>

				<div class="details">
					<span class="author">
						<a href="/about">
							<figure class="avatar">
								<div>
									<img src="https://github.com/gustavomorinaga.png" alt="Gustavo Morinaga avatar" />
								</div>
							</figure>
						</a>

						<div class="author__content">
							<address>
								<a href="/about" rel="author">Gustavo Morinaga</a>
							</address>

							<span>
								{#if dateIsValid(post.publishedAt)}
									<time>
										{dateFormatter({
											lang: $LANG.code,
											date: new Date(post.publishedAt),
											dateStyle: 'full'
										})}
									</time>
									•
								{/if}
								<span>{post.readingTime} min {$LANG.post.read}</span>
							</span>
						</div>
					</span>

					<ul class="tags">
						{#if post.tags && post.tags.length}
							{#each post.tags as tag, index}
								{#if index + 1 <= TAG_LIMIT}
									<li>
										<a
											class="tag"
											href="/blog/tags/{tag.value}"
											title={tag.label}
											aria-label={tag.label}
										>
											<Icon icon={tag.icon} collection={tag.collection} />
										</a>
									</li>
								{/if}
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</header>

	<div>
		<slot />

		<aside>
			<ul class="options">
				{#if canShare}
					<li class="cta">
						<button on:click={sharePost}>
							<Icon icon="share" size="sm" />
							{$LANG.post.options.share}
						</button>
					</li>
				{/if}

				<li data-tip={$LANG.post.options.newsletter}>
					<a href="#newsletter" on:click|preventDefault={scrollIntoView}>
						<Icon icon="news" size="sm" />
					</a>
				</li>
				<li data-tip={$LANG.post.options.comments}>
					<a href="#comments" on:click|preventDefault={scrollIntoView}>
						<Icon icon="message" size="sm" />
					</a>
				</li>
			</ul>

			{#if relatedPosts && relatedPosts.length}
				<p>{$LANG.post.related}</p>

				<ul class="related">
					{#each relatedPosts as relatedPost}
						<li>
							<a href="/blog/{relatedPost.slug}" use:balancer>
								{relatedPost.title}
							</a>
							<span>
								<time>
									{dateFormatter({
										lang: $LANG.code,
										date: new Date(relatedPost.publishedAt),
										dateStyle: 'medium'
									})}
								</time>
								•
								<span>{post.readingTime} min</span>
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</aside>
	</div>

	<CardNewsletter />

	<Giscus
		id="comments"
		repo="{PUBLIC_USERNAME}/{PUBLIC_REPO}"
		repoId={PUBLIC_REPO_ID}
		category="Comments"
		categoryId={PUBLIC_CATEGORY_ID}
		theme="dark"
		lang={$LANG.code}
		loading="lazy"
	/>
</article>

<style lang="scss" global>
	article.post {
		@apply block -mt-10 md:-mt-8;

		& > header {
			@apply relative z-20 block w-screen min-h-[24rem] p-8 mb-8 bg-cover bg-no-repeat bg-center overflow-hidden;
			background-image: var(--cover);
			margin-left: calc(-50vw + 50%);

			&::before {
				content: '';
				@apply absolute inset-0 -z-10 block bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-black/60;
			}

			& > div.wrapper {
				@apply block max-w-5xl mx-auto;

				& > a.btn__previous {
					@apply btn btn-ghost btn-sm gap-1 drop-shadow-lg text-shadow-lg shadow-black;
				}

				& > div {
					@apply block;

					& > h1 {
						@apply text-2xl md:text-5xl font-bold mt-8 mb-4 text-shadow-lg shadow-black/75;

						& + p {
							@apply text-lg md:text-2xl text-stone-400 mb-12 text-shadow-lg shadow-black/75;
						}
					}

					& ul.tags {
						@apply flex items-center gap-2;

						& > li {
							& > a.tag {
								@apply badge badge-ghost badge-lg h-auto py-1 border border-base-300 shadow;

								@media (hover: hover) {
									&:hover {
										@apply border-primary shadow-glow shadow-primary/10;
									}
								}
							}
						}
					}

					& > .details {
						@apply flex flex-col md:flex-row md:items-center md:justify-between gap-4;

						& span.author {
							@apply flex md:items-center gap-2;

							& figure.avatar {
								@apply flex self-start md:block card-bordered rounded-full mt-1 md:m-0;

								& > div {
									@apply w-8 md:w-10 rounded-full;
								}
							}

							& > div.author__content {
								@apply block w-full;

								& address {
									@apply block;

									& a {
										@apply text-sm md:text-base font-bold not-italic;
									}
								}

								& > span {
									@apply text-sm md:text-base flex flex-wrap md:items-center gap-x-2 text-stone-400;
								}
							}
						}
					}
				}
			}
		}

		& > div {
			@apply md:grid md:grid-cols-12 gap-4;

			& > aside {
				@apply md:col-span-4 md:sticky md:top-24 self-start mb-8 border-t border-base-200 md:border-none pt-8 md:p-0;

				& > ul.options {
					@apply flex flex-wrap gap-2 mb-8;

					& > li {
						& > button,
						& > a {
							@apply btn btn-block btn-sm gap-1;
						}

						&.cta {
							@apply flex-grow;

							& > button,
							& > a {
								@apply btn-primary;
							}
						}

						&:not(.cta) {
							@apply md:tooltip md:tooltip-bottom;
						}
					}
				}

				& > p {
					@apply text-stone-400 mb-4;
				}

				& > ul.related {
					@apply flex flex-col gap-4 mb-8;

					& > li {
						& > a {
							@apply link link-hover link-primary text-base font-bold;
						}

						& > span {
							@apply flex items-center gap-2 text-stone-400 text-sm;
						}
					}
				}
			}
		}
	}
</style>
