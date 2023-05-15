<script lang="ts">
	import { Icon } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { HOST, estimateReadingTime, dateFormatter, dateIsValid, diffDays } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import type { IIcon, IPost } from '$lib/ts';

	const NEW_POST_RELEASE_DAYS_LIMIT = 7;

	export let post: IPost;
	export let tagLimit = 5;
	export let tagSize: IIcon['size'] = 'sm';

	const { slug, title, cover, content, tags, publishedAt } = post;

	const publishDateIsValid = dateIsValid(publishedAt);
	const isNewPost =
		publishDateIsValid && diffDays(new Date(publishedAt), new Date()) < NEW_POST_RELEASE_DAYS_LIMIT;
</script>

<a class="post" href="/blog/{slug}" style="--cover: url({HOST + cover.formats.medium?.url});">
	<div class="card-body">
		<header>
			{#if isNewPost}
				<span class="new">Novo</span>
			{/if}

			<h3 use:balancer>{title}</h3>
		</header>

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
						{#if publishDateIsValid}
							<time>
								{dateFormatter({
									lang: $LANG.code,
									date: new Date(publishedAt),
									dateStyle: 'medium'
								})}
							</time>
							•
						{/if}
						<span>{estimateReadingTime(content)} min</span>
					</span>
				</div>
			</div>

			<ul class="tags">
				{#if tags && tags?.length}
					{#each tags as tag, index}
						{#if index + 1 <= tagLimit}
							<li class="tag" title={tag.label} aria-label={tag.label}>
								<Icon icon={tag.icon} collection={tag.collection} size={tagSize} />
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
		@apply z-10 card card-bordered min-h-[10rem] overflow-hidden shadow-lg transition duration-700 ease-smooth;
		&::before {
			content: '';
			@apply absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-smooth;
			background-image: var(--cover);
		}
		&::after {
			content: '';
			@apply absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-black/60 transition-opacity duration-700 ease-smooth;
		}

		@media (hover: hover) {
			&:hover {
				@apply border-primary shadow-glow shadow-primary/10 before:scale-105 after:opacity-90;
			}
		}

		& .card-body {
			@apply justify-stretch;

			& > header {
				@apply flex flex-col flex-grow gap-4;

				& > span.new {
					@apply badge badge-primary badge-lg uppercase font-semibold;
				}

				& > h3 {
					@apply text-xl md:text-2xl font-futuristic h-full mt-auto mb-4 text-shadow-lg shadow-black/75;
				}
			}

			& > footer {
				@apply flex flex-col-reverse md:flex-row justify-between gap-4;

				& .author {
					@apply flex items-center;

					& > figure.avatar {
						@apply mr-3 card-bordered rounded-full;

						& > div {
							@apply w-8 rounded-full;
						}
					}

					& > div {
						@apply block text-sm leading-5;

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
