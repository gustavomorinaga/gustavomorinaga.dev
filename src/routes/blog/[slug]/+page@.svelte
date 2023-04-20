<script lang="ts">
	import '$lib/styles/prism.scss';
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { HOST, dateFormatter } from '$lib/utils';
	import { afterNavigate } from '$app/navigation';
	import { balancer } from 'svelte-action-balancer';

	export let data;

	const { post } = data;
	let previousPathname = '/blog';

	const registerView = async () => {
		return await fetch(`${PUBLIC_CMS_URL}/api/blog-posts/${post.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: { views: post.views + 1 } })
		});
	};

	afterNavigate(({ from }) => (previousPathname = from?.url.pathname || previousPathname));

	onMount(async () => {
		await registerView();
	});
</script>

<Metadata title={post.title} description={post.description} />

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

				<div class="author">
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
						<time>
							{dateFormatter({
								lang: $LANG.code,
								date: new Date(post.publishedAt),
								dateStyle: 'full'
							})}
						</time>
					</div>
				</div>
			</div>
		</div>
	</header>

	<section class="content">
		{@html post.content}
	</section>
</article>

<style lang="scss" global>
	article.post {
		@apply block -mt-8;

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

					& h1 {
						@apply text-5xl font-bold mt-8 mb-4 text-shadow-lg shadow-black/75;

						& + p {
							@apply text-2xl text-stone-400 mb-8 text-shadow-lg shadow-black/75;
						}
					}

					& div.author {
						@apply flex items-center gap-2;

						& figure.avatar {
							@apply block;

							& > div {
								@apply w-10 rounded-full;
							}
						}

						& > div.author__content {
							@apply block;

							& address {
								@apply block;

								& a {
									@apply font-bold not-italic;
								}
							}
						}
					}
				}
			}
		}

		& > section.content {
			@for $i from 1 through 6 {
				& > h#{$i} {
					@apply text-primary font-bold mb-4;
				}
			}

			& > h2 {
				@apply text-3xl mt-12 mb-4;
			}

			& > h3 {
				@apply text-2xl mt-8;
			}

			& > h4 {
				@apply text-xl mt-8;
			}

			& > h5 {
				@apply text-lg mt-8;
			}

			& > h6 {
				@apply text-base mt-8;
			}

			& p {
				@apply text-lg;
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
				@apply text-lg;
			}

			& li + li {
				@apply mt-2;
			}

			& > blockquote {
				@apply block p-8 mb-8 rounded-box bg-base-100/75 border-l-4 border-primary;

				& > p {
					@apply block;
				}
			}

			& dd {
				@apply ml-8;
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
				@apply rounded-box mx-auto;
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
				@apply inline px-1 rounded-box card-bordered bg-base-100/75 text-base text-primary;
			}

			& .file-title {
				@apply py-2 px-4 text-base font-bold text-base-content bg-base-200/75 rounded-t-box card-bordered;
				margin-bottom: 0 !important;

				& + pre {
					@apply mt-0 rounded-t-none border-t-0;
				}
			}
		}
	}
</style>
