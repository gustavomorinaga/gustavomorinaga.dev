<script lang="ts">
	import type { IRaindrop } from '$lib/ts';

	export let bookmark: IRaindrop;
	const { title, excerpt, link, cover, tags } = bookmark;
</script>

<a
	class="bookmark"
	href={link}
	{title}
	aria-label={title}
	target="_blank"
	rel="noopener noreferrer"
>
	<article>
		<figure>
			<img src={cover} alt={excerpt} />
		</figure>

		<div class="card-body">
			<header>
				<h2>{title}</h2>
				<ul>
					{#each tags as tag}
						<span class="category">{tag}</span>
					{/each}
				</ul>
			</header>

			<p>{excerpt}</p>
		</div>
	</article>
</a>

<style lang="scss" global>
	a.bookmark {
		& > article {
			@apply card card-compact card-bordered h-full bg-base-100/75 shadow-lg backdrop-blur-md transition duration-700 ease-smooth;

			@media (hover: hover) {
				&:hover {
					@apply no-underline border-primary shadow-glow shadow-primary/10;

					& figure {
						@apply brightness-100 grayscale-0;
					}
				}
			}

			& figure {
				@apply relative h-48 border-b border-base-200 brightness-90 grayscale-[0.5] transition duration-300 ease-out;

				& img {
					@apply object-cover w-full h-full;
				}
			}

			& .card-body {
				@apply max-w-[70vw] md:max-w-full;

				& header {
					@apply flex flex-col gap-2;

					& h2 {
						@apply text-lg text-base-content line-clamp-2 font-futuristic text-shadow-glow shadow-primary;
					}

					& .category {
						@apply badge gap-1;
					}
				}

				& p {
					@apply text-sm text-base-content line-clamp-2;
				}
			}
		}
	}
</style>
