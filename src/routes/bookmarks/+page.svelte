<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';

	export let data;

	let tag = $page.url.searchParams.get('tag') || 'all';

	$: bookmarks = data.bookmarks.items.filter(({ tags }) =>
		tag !== 'all' ? tags.includes(tag) : true
	);

	const handleFilter = () => {
		const query = new URLSearchParams($page.url.searchParams);
		query.set('tag', tag);

		goto(`?${query.toString()}`);
	};
</script>

<Metadata title={$LANG.bookmarks.title} description={$LANG.bookmarks.paragraph} />

<code class="bookmarks">profile<span class="method">.bookmarks()</span>;</code>

<article class="bookmarks" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.bookmarks.title}</h1>

	<p>{$LANG.bookmarks.paragraph}</p>

	<div class="bookmarks__filters">
		<div class="card-body">
			<div class="btn-group">
				{#each data.tags.items as { _id }}
					<input
						class="btn btn-sm md:btn-md"
						type="radio"
						name="filters"
						value={_id}
						data-title={$LANG.bookmarks.filters[_id]}
						bind:group={tag}
						on:change={handleFilter}
					/>
				{/each}
			</div>

			<small class="info">
				<Icon icon="help" size="sm" />
				{$LANG.bookmarks.help}
			</small>
		</div>
	</div>

	<ul class="bookmarks__list">
		{#each bookmarks as { title, excerpt, link, cover, tags }}
			<li>
				<a href={link} {title} aria-label={title} target="_blank" rel="noopener noreferrer">
					<article class="bookmark">
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
			</li>
		{/each}
	</ul>
</article>

<style lang="scss" global>
	code.bookmarks {
		@apply md:mt-16;
	}

	article.bookmarks {
		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-8;

			& > a {
				@apply link-primary link-hover;
			}
		}

		& > .bookmarks__filters {
			@apply sticky z-10 top-16 md:top-[4.5rem] card card-compact card-bordered mb-8 bg-base-100/75 shadow-lg backdrop-blur-md;

			& .card-body {
				@apply flex-row flex-wrap items-center gap-x-8 gap-y-4;

				& > .btn-group {
					@apply md:flex-wrap gap-4 -mb-4 pb-2 md:m-0 md:p-0 overflow-x-scroll md:overflow-visible scrollbar__theme;

					& > .btn {
						@apply shadow;
						border-radius: var(--rounded-btn) !important;
					}
				}

				& > .info {
					@apply hidden md:flex items-center gap-2 text-sm text-base-content;

					& .icon {
						@apply text-primary;
					}
				}
			}
		}

		& > ul.bookmarks__list {
			@apply grid grid-cols-1 md:grid-cols-3 gap-4;

			& .bookmark {
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
	}
</style>
