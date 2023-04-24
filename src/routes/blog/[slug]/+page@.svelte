<script lang="ts">
	import '$lib/styles/prism.scss';
	import {
		PUBLIC_CATEGORY_ID,
		PUBLIC_CMS_URL,
		PUBLIC_REPO,
		PUBLIC_REPO_ID,
		PUBLIC_USERNAME
	} from '$env/static/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { CardNewsletter, Giscus, Icon, Metadata } from '$lib/components';
	import { IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
	import { HOST, dateFormatter, estimateReadingTime, scrollIntoView } from '$lib/utils';
	import { afterNavigate } from '$app/navigation';
	import { balancer } from 'svelte-action-balancer';

	export let data;

	const TAG_LIMIT = 5;
	const ROOT_PATHNAME = '/blog';
	const POST_PATHNAME = '/blog/[slug]';
	const { post, relatedPosts } = data;
	const shareableData = {
		title: post.title,
		text: post.description,
		url: $page.url.href
	};
	let previousPathname = ROOT_PATHNAME;

	const registerView = async () =>
		await fetch(`${PUBLIC_CMS_URL}/api/blog-posts/${post.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: { views: post.views + 1 } })
		});

	afterNavigate(({ from }) => {
		const isPostPathname = from?.route.id?.includes(POST_PATHNAME);

		previousPathname = !isPostPathname ? from?.url.pathname || previousPathname : ROOT_PATHNAME;
	});

	onMount(async () => {
		await registerView();
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
								<time>
									{dateFormatter({
										lang: $LANG.code,
										date: new Date(post.publishedAt),
										dateStyle: 'full'
									})}
								</time>
								•
								<span>{post.readingTime} min {$LANG.post.read}</span>
							</span>
						</div>
					</span>

					<ul class="tags">
						{#if post.tags && post.tags?.length}
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
		<section class="content pb-16">
			{@html post.content}
		</section>

		<aside>
			<ul class="options">
				{#if browser ? navigator.canShare && navigator.canShare(shareableData) : false}
					<li class="cta">
						<button on:click={() => navigator.share(shareableData)}>
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

			<p>{$LANG.post.related}</p>

			<ul class="related">
				{#each relatedPosts.data as relatedPost}
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
							<span>{estimateReadingTime(relatedPost.content)} min</span>
						</span>
					</li>
				{/each}
			</ul>
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

			& > section.content {
				@apply md:col-span-8 md:pr-4 md:border-r md:border-base-200;

				@for $i from 1 through 6 {
					& > h#{$i} {
						@apply text-primary font-bold mb-4;
					}
				}

				& > h2 {
					@apply text-2xl md:text-3xl mt-12 mb-4;
				}

				& > h3 {
					@apply text-xl md:text-2xl mt-8;
				}

				& > h4 {
					@apply text-lg md:text-xl mt-8;
				}

				& > h5 {
					@apply text-base md:text-lg mt-8;
				}

				& > h6 {
					@apply text-base mt-8;
				}

				& p {
					@apply md:text-lg;
				}

				p:not(:last-child),
				dl:not(:last-child),
				ol:not(:last-child),
				ul:not(:last-child),
				blockquote:not(:last-child),
				pre:not(:last-child),
				table:not(:last-child),
				img:not(:last-child) {
					@apply mb-8;
				}

				& a {
					@apply link-primary link-hover;
				}

				& > ul {
					@apply list-disc;

					&,
					& > ul,
					& > ul > ul {
						@apply list-inside marker:text-primary mb-8;
					}

					& > ul {
						list-style-type: circle;

						& > ul {
							list-style-type: square;
						}
					}
				}

				& > ol {
					@apply list-decimal;

					&,
					& > ol,
					& > ol > ol {
						@apply list-inside marker:text-primary mb-8;
					}

					& > ol {
						list-style-type: lower-alpha;

						& > ol {
							list-style-type: lower-roman;
						}
					}
				}

				& li {
					@apply md:text-lg;
				}

				& li + li {
					@apply mt-2;
				}

				& > blockquote {
					@apply block p-4 md:p-8 mb-8 rounded-box bg-base-100/75 border-l-4 border-primary;

					& > p {
						@apply block;
					}
				}

				& dd {
					@apply ml-8;
				}

				& kbd {
					@apply kbd-sm;
				}

				& figure {
					@apply text-center mx-auto;

					&:not(:first-child) {
						@apply mt-8;
					}
					&:not(:last-child) {
						@apply mb-8;
					}

					& > img {
						@apply inline-block;
					}

					& > figcaption {
						@apply italic;
					}
				}

				img,
				video {
					@apply card-bordered rounded-box mx-auto;
				}

				sup,
				sub {
					@apply text-sm;
				}

				& table {
					@apply table-auto w-full text-left border-collapse card-bordered rounded-box;

					& > thead {
						@apply bg-base-200/75;

						& > tr {
							@apply border-b border-base-200;

							& > th {
								@apply px-4 py-2;
							}
						}
					}

					& > tbody {
						& > tr {
							@apply odd:bg-base-100/75 even:bg-base-100/50;

							& > td {
								@apply px-4 py-2;
							}
						}
					}
				}

				& code:not([class]) {
					@apply inline px-1 rounded-box card-bordered bg-base-200/75 text-sm md:text-base text-primary;
				}

				& .file-title {
					@apply py-2 px-4 text-sm md:text-base font-bold text-base-content bg-base-200/75 rounded-t-box card-bordered;
					margin-bottom: 0 !important;

					& + pre {
						@apply mt-0 rounded-t-none border-t-0;
					}
				}
			}

			& > aside {
				@apply md:col-span-4 md:sticky md:top-24 self-start mb-8 border-t border-base-200 md:border-none pt-8 md:p-0;

				& > ul.options {
					// @apply grid grid-flow-col gap-2 mb-8;
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
