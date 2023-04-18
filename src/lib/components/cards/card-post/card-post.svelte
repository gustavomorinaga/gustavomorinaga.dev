<script lang="ts">
	import { LANG } from '$lib/stores';
	import { HOST, estimateReadingTime, simpleDateFormatter } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import type { IPost } from '$lib/ts';

	export let post: IPost;
	const { slug, title, cover, content, tags, publishedAt } = post;
</script>

<a class="post" href="/blog/{slug}" style="--cover: url({HOST + cover.url});">
	<div class="card-body">
		<h2 use:balancer>{title}</h2>

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
								date: new Date(publishedAt)
							})}
						</time>
						•
						<time>{estimateReadingTime(content)} min</time>
					</span>
				</div>
			</div>

			<ul class="tags">
				{#if tags && tags?.length}
					{#each tags as tag, index}
						{#if index + 1 <= 3}
							<li class="tag">{tag.label}</li>
						{/if}
					{/each}
				{/if}
			</ul>
		</footer>
	</div>
</a>

<style lang="scss" global>
	a.post {
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
					@apply flex items-center;

					& > figure.avatar {
						@apply mr-2;

						& > div {
							@apply w-10 rounded-full;
						}
					}

					& > div {
						@apply block leading-5;

						& address {
							@apply block text-shadow-lg;

							& a {
								@apply font-bold not-italic;
							}
						}

						& > span {
							@apply flex items-center gap-2 text-gray-400;
						}
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
</style>
