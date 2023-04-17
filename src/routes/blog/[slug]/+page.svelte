<script lang="ts">
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { simpleDateFormatter, HOST } from '$lib/utils';

	export let data;

	const { post } = data;

	const registerView = async () => {
		return await fetch(`${PUBLIC_CMS_URL}/api/blog-posts/${post.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: { views: post.views + 1 } })
		});
	};

	onMount(async () => {
		await registerView();
	});
</script>

<Metadata title={post.title} description={post.description} />

<article class="post">
	<header style="--cover: url({HOST + post.cover.url});">
		<div>
			<h1>{post.title}</h1>
			<p>{post.subtitle}</p>

			<div class="author">
				<figure class="avatar">
					<div>
						<img src="https://github.com/gustavomorinaga.png" alt="Gustavo Morinaga avatar" />
					</div>
				</figure>

				<div class="author__content">
					<address>
						<a href="/about" rel="author">Gustavo Morinaga</a>
					</address>
					<time>{simpleDateFormatter({ lang: $LANG.code, date: new Date(post.publishedAt) })}</time>
				</div>
			</div>
		</div>
	</header>

	{@html post.content}
</article>

<style lang="scss" global>
	article.post {
		@apply block -mt-8;

		& header {
			@apply relative z-20 grid place-items-center w-screen h-96 p-16 mb-8 bg-cover bg-no-repeat bg-center overflow-hidden;
			background-image: var(--cover);
			margin-left: calc(-50vw + 50%);

			&::before {
				content: '';
				@apply absolute inset-0 -z-10 block bg-gradient-to-t from-black via-black/75;
			}

			& > div {
				@apply grid place-items-center max-w-5xl;

				& h1 {
					@apply text-5xl font-bold text-center mb-4 text-shadow-lg;

					& + p {
						@apply text-2xl text-center mb-4;
					}
				}

				& div.author {
					@apply flex items-center gap-2;

					& > figure.avatar {
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
</style>
