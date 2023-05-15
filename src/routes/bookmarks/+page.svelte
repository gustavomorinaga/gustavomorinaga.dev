<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CardBookmark, Icon, Metadata, PageTransition } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { scrollToTop } from '$lib/utils';

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

<section class="bookmarks" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.bookmarks.title}</h1>

	<p>{$LANG.bookmarks.paragraph}</p>

	<div class="bookmarks__filters">
		<div class="card-body">
			<ul class="filters">
				{#each tags.items as { _id }}
					<li>
						<a
							class:current={tag === _id}
							href="/bookmarks?tag={_id}"
							rel="tag"
							on:click={scrollToTop}
						>
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
			{#each bookmarks as bookmark}
				<li>
					<CardBookmark {bookmark} />
				</li>
			{/each}
		</ul>
	</PageTransition>
</section>

<style lang="scss" global>
	code.bookmarks {
		@apply md:mt-16;
	}

	section.bookmarks {
		& > h1 {
			@apply text-3xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-base md:text-xl mb-8;

			& > a {
				@apply link-primary link-hover;
			}
		}

		& .bookmarks__filters {
			@apply sticky z-10 top-16 md:top-[4.5rem] card card-compact card-bordered mb-8 bg-base-100/75 shadow-lg backdrop-blur-md;

			& .card-body {
				@apply flex-row flex-wrap items-center gap-x-8 gap-y-4 px-0 md:px-4;

				& > ul.filters {
					@apply flex md:flex-wrap gap-4 -mb-4 px-4 md:px-0 pb-2 md:m-0 md:p-0 overflow-x-scroll md:overflow-visible scrollbar__theme;

					& > li {
						& > a {
							@apply btn btn-sm md:btn-md;

							&.current {
								@apply btn-primary;
							}
						}
					}
				}

				& > small.info {
					@apply hidden md:flex items-center gap-2 text-sm text-base-content;

					& .icon {
						@apply text-primary;
					}
				}
			}
		}

		& ul.bookmarks__list {
			@apply grid grid-cols-1 md:grid-cols-3 gap-4;
		}
	}

	html.low__end {
		& section.bookmarks {
			& .bookmarks__filters {
				@apply bg-base-100 backdrop-blur-none;
			}
		}
	}
</style>
