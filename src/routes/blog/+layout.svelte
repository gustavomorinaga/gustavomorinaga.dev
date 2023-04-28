<script lang="ts">
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon, PageTransition } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { scrollToTop } from '$lib/utils';

	export let data;

	const { tags } = data;
</script>

<code class="typewriter blog">profile<span class="method">.blog()</span>;</code>

<div class="blog" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.blog.title}</h1>

	<p>{$LANG.blog.paragraph}</p>

	<div class="blog__layout" in:fly={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}>
		<aside class="filters">
			<div class="form-control">
				<label>
					<span>
						<Icon icon="search" size="sm" />
					</span>

					<input
						class="search"
						type="text"
						name="term"
						id="term"
						placeholder={$LANG.blog.placeholder}
					/>
				</label>
			</div>

			<ul class="menu">
				<li>
					<a href="/blog" class:active={!$page.params.value} on:click={scrollToTop}>
						<Icon icon="stack-2" />
						{$LANG.blog.filters.all}
					</a>
				</li>
				{#each tags.data as tag (tag.id)}
					<li>
						<a
							class:active={$page.params.value === tag.value}
							href="/blog/tags/{tag.value}"
							on:click={scrollToTop}
						>
							<Icon icon={tag.icon} collection={tag.collection} />
							<span>{tag.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</aside>

		<section class="posts" in:fly={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
			<PageTransition trigger={data.pathname}>
				<slot />
			</PageTransition>
		</section>
	</div>
</div>

<style lang="scss" global>
	code.blog {
		@apply md:mt-16;
	}

	div.blog {
		& > h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > p {
			@apply text-xl mb-8;
		}

		& > .blog__layout {
			@apply grid md:grid-cols-10 gap-y-4 md:gap-8;

			& > aside.filters {
				@apply md:sticky md:top-24 md:col-span-3 self-start flex flex-col gap-4 mb-8 md:mb-0;

				& > div.form-control {
					& > label {
						@apply input-group;

						& > input.search {
							@apply input input-bordered w-full;
						}
					}
				}

				& input.search {
					@apply input input-bordered;
				}

				& > ul.menu {
					@apply menu-horizontal md:menu-vertical flex-nowrap md:max-w-none w-full overflow-x-auto md:overflow-hidden
						card-bordered rounded-box overflow-hidden bg-base-100/75 shadow-lg backdrop-blur-md scrollbar__theme scrollbar-track-base-200;
					max-width: calc(100vw - 2rem);

					& > li {
						& > a {
							& > span {
								@apply hidden md:block;
							}
						}
					}
				}
			}

			& > section.posts {
				@apply md:col-span-full md:col-start-4 min-h-[75vh];

				& > .page__transition {
					& > h2 {
						@apply text-3xl font-futuristic text-shadow-rgb mb-8;
					}

					& ul.posts__list {
						@apply flex flex-col gap-4;
					}

					& button.btn__fetch {
						@apply btn btn-wide flex mt-8 mx-auto;
					}
				}
			}
		}
	}
</style>
