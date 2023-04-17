<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, Metadata, PageTransition } from '$lib/components';
	import { LANG } from '$lib/stores';

	export let data;

	const { tags } = data;

	$: tag = (browser && $page.url.searchParams.get('tag')) || 'all';
	$: bookmarks = data.bookmarks.items.filter(({ tags }) =>
		tag !== 'all' ? tags.includes(tag) : true
	);
</script>

<Metadata
	title={$LANG.bookmarks.metadata.title}
	description={$LANG.bookmarks.metadata.description}
/>

<code class="typewriter bookmarks">profile<span class="method">.bookmarks()</span>;</code>

<div class="bookmarks" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.bookmarks.title}</h1>

	<p>{$LANG.bookmarks.paragraph}</p>

	<div class="bookmarks__filters">
		<div class="card-body">
			<ul class="filters">
				{#each tags.items as { _id }}
					<li>
						<a class="btn" class:btn-primary={tag === _id} href="/bookmarks?tag={_id}">
							{$LANG.bookmarks.filters[_id]}
						</a>
					</li>
				{/each}
			</ul>

			<small class="info">
				<Icon icon="help" size="sm" />
				{$LANG.bookmarks.help}
			</small>
		</div>
	</div>

	<PageTransition trigger={tag}>
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
	</PageTransition>
</div>

<style lang="scss" global>
	code.bookmarks {
		@apply md:mt-16;
	}

	div.bookmarks {
		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-8;

			& > a {
				@apply link-primary link-hover;
			}
		}

		& .bookmarks__filters {
			@apply sticky z-10 top-16 md:top-[4.5rem] card card-compact card-bordered mb-8 bg-base-100/75 shadow-lg backdrop-blur-md;

			& .card-body {
				@apply flex-row flex-wrap items-center gap-x-8 gap-y-4;

				& > ul.filters {
					@apply flex md:flex-wrap gap-4 -mb-4 pb-2 md:m-0 md:p-0 overflow-x-scroll md:overflow-visible scrollbar__theme;
				}

				& > .info {
					@apply hidden md:flex items-center gap-2 text-sm text-base-content;

					& .icon {
						@apply text-primary;
					}
				}
			}
		}

		& ul.bookmarks__list {
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
