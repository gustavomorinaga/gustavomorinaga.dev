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
	import { toc, createTocStore } from '@svelte-put/toc';
	import { balancer } from 'svelte-action-balancer';
	import qs from 'qs';
	import type { ICMSData, IPost } from '$lib/ts';

	export let data;
	const { post, content } = data;

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

	const tocStore = createTocStore();

	const sharePost = async () => await navigator.share(shareableData);

	const registerView = async () => {
		const postView = post?.postViews?.at(0);
		if (!postView) return;

		await fetch(`/api/posts/${post.slug}/view`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: postView.id })
		});
	};

	const loadRelatedPosts = async () => {
		const query = { tags: post.tags.map(t => t.value) };

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

	afterNavigate(({ from }) => {
		const isPostPathname = from?.route.id?.includes(POST_PATHNAME);

		previousPathname = !isPostPathname ? from?.url.pathname || previousPathname : ROOT_PATHNAME;
	});

	onMount(async () => {
		await Promise.all([loadRelatedPosts(), registerView()]);

		$page.url.hash && scrollIntoView($page.url.hash);
	});
</script>

<Metadata
	title={post.title}
	description={post.description}
	thumbnail={post.cover.formats.small?.url}
	thumbnailIsExternal
/>

<article class="post">
	<header style="--cover: url({HOST + post.cover.formats.large?.url});">
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
						<a href="/about" rel="author">
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
								• <span>{post.views} {$LANG.post.views}</span>
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
		<section class="content" use:toc={{ store: tocStore, observe: true, anchor: false }}>
			{@html content}
		</section>

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

			{#if Object.values($tocStore.items).length}
				<section class="toc">
					<div class="divider">{$LANG.post.toc}</div>

					<ul class="menu-compact menu">
						{#each Object.values($tocStore.items) as { id, text }}
							<li>
								<a
									href="#{id}"
									data-toc-link-active={$tocStore.activeItem?.id === id}
									rel="bookmark"
								>
									<Icon icon="arrow-badge-right" size="sm" />
									<span>{text.replace('#', '')}</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if relatedPosts && relatedPosts.length}
				<section class="related">
					<div class="divider">{$LANG.post.related}</div>

					<ul>
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
									<span>{relatedPost.readingTime} min</span>
								</span>
							</li>
						{/each}
					</ul>
				</section>
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
	@use '$lib/styles/prism' as p;
	@use '$lib/styles/markdown' as m;

	article.post {
		@apply -mt-10 block md:-mt-8;

		& > header {
			@apply relative z-20 mb-8 block min-h-[24rem] w-screen overflow-hidden bg-cover bg-center bg-no-repeat p-8;
			background-image: var(--cover);
			margin-left: calc(-50vw + 50%);

			&::before {
				content: '';
				@apply absolute inset-0 -z-10 block bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-black/60;
			}

			& > div.wrapper {
				@apply mx-auto block max-w-5xl;

				& > a.btn__previous {
					@apply btn btn-ghost btn-sm gap-1 shadow-black drop-shadow-lg text-shadow-lg;
				}

				& > div {
					@apply block;

					& > h1 {
						@apply mb-4 mt-8 text-2xl font-bold shadow-black/75 text-shadow-lg md:text-5xl;

						& + p {
							@apply mb-12 text-base text-stone-400 shadow-black/75 text-shadow-lg md:text-2xl;
						}
					}

					& ul.tags {
						@apply flex items-center justify-center gap-2 md:justify-start;

						& > li {
							& > a.tag {
								@apply badge badge-ghost badge-lg h-auto border border-base-300 py-1 shadow;

								@media (hover: hover) {
									&:hover {
										@apply border-primary shadow-glow shadow-primary/10;
									}
								}
							}
						}
					}

					& > .details {
						@apply flex flex-col gap-4 md:flex-row md:items-center md:justify-between;

						& span.author {
							@apply flex gap-2 md:items-center;

							& figure.avatar {
								@apply card-bordered mt-1 flex self-start rounded-full md:m-0 md:block;

								& > div {
									@apply w-8 rounded-full md:w-10;
								}
							}

							& > div.author__content {
								@apply block w-full;

								& address {
									@apply block;

									& a {
										@apply text-sm font-bold not-italic md:text-base;
									}
								}

								& > span {
									@apply flex flex-wrap gap-x-2 text-sm text-stone-400 md:items-center md:text-base;
								}
							}
						}
					}
				}
			}
		}

		& > div {
			@apply gap-4 md:grid md:grid-cols-12;

			& > section.content {
				@apply pb-16 md:col-span-8 md:border-r md:border-base-200 md:pr-4;
				@include p.prism;
				@include m.markdown;
			}

			& > aside {
				@apply mb-8 self-start border-t border-base-200 pt-8 md:sticky md:top-24 md:col-span-4 md:border-none md:p-0;

				& > ul.options {
					@apply mb-8 flex flex-wrap gap-2;

					& > li {
						& > button,
						& > a {
							@apply btn btn-sm btn-block gap-1;
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

				& > section {
					& > .divider {
						@apply text-stone-400;
					}

					&.toc {
						@apply hidden md:block;

						& > ul {
							@apply card-bordered rounded-box mb-8 overflow-hidden bg-base-100/75;

							& > li {
								& > a {
									@apply transition duration-300 ease-out active:bg-base-300;

									& .icon {
										@apply -ml-8 opacity-0 transition-all duration-300 ease-out;
									}
									& > span {
										@apply line-clamp-1;
									}

									&[data-toc-link-active='true'] {
										@apply btn-active text-primary;

										& .icon {
											@apply ml-0 opacity-100;
										}
										& > span {
											@apply font-semibold;
										}
									}
								}
							}
						}
					}

					&.related {
						& > ul {
							@apply mb-8 flex flex-col gap-4;

							& > li {
								& > a {
									@apply link-hover link-primary link text-base font-bold;
								}

								& > span {
									@apply flex items-center gap-2 text-sm text-stone-400;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
