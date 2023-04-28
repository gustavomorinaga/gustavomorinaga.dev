<script lang="ts">
	import { Icon } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { HOST, estimateReadingTime, dateFormatter } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import type { IPost } from '$lib/ts';

	export let post: IPost;
	export let tagLimit = 5;

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
					<strong>Gustavo Morinaga</strong>

					<span>
						<time>
							{dateFormatter({
								lang: $LANG.code,
								date: new Date(publishedAt),
								dateStyle: 'medium'
							})}
						</time>
						•
						<span>{estimateReadingTime(content)} min</span>
					</span>
				</div>
			</div>

			<ul class="tags">
				{#if tags && tags?.length}
					{#each tags as tag, index}
						{#if index + 1 <= tagLimit}
							<li class="tag" title={tag.label} aria-label={tag.label}>
								<Icon icon={tag.icon} collection={tag.collection} size="sm" />
							</li>
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
				@apply text-xl md:text-3xl font-futuristic mb-4 text-shadow-lg shadow-black/75;
			}

			& > footer {
				@apply flex flex-col-reverse md:flex-row justify-between gap-4 mt-auto;

				& .author {
					@apply flex items-center;

					& > figure.avatar {
						@apply mr-3;

						& > div {
							@apply w-8 md:w-10 rounded-full;
						}
					}

					& > div {
						@apply block leading-5;

						& > span {
							@apply flex items-center gap-2 text-stone-400;
						}
					}
				}

				& ul.tags {
					@apply flex items-center gap-2;

					& > li.tag {
						@apply badge badge-ghost badge-lg h-auto py-1 border border-base-300 shadow;
					}
				}
			}
		}
	}
</style>
