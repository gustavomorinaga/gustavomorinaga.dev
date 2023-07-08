<script lang="ts">
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CarouselFeaturedPosts, Icon, PageTransition } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { scrollToTop } from '$lib/utils';

	export let data;
	const { featured, tags } = data;
</script>

<code class="blog typewriter">profile<span class="method">.blog()</span>;</code>

<div class="blog" in:fly|global={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.blog.title}</h1>

	<p>{$LANG.blog.paragraph}</p>

	<CarouselFeaturedPosts slides={featured.data} />

	<div class="divider" />

	<div
		class="blog__layout"
		in:fly|global={{ y: 50, duration: 1000, delay: 2300, easing: cubicOut }}
	>
		<aside class="filters">
			<!-- <div class="form-control">
				<label>
					<span>
						<Icon icon="search" size="sm" />
					</span>

					<input
						class="input"
						type="text"
						name="term"
						id="term"
						placeholder={$LANG.blog.placeholder}
					/>
				</label>
			</div> -->

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

		<section class="posts" in:fly|global={{ y: 50, duration: 1000, delay: 2600, easing: cubicOut }}>
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
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > p {
			@apply mb-12 text-base md:text-xl;
		}

		& > .blog__layout {
			@apply grid gap-y-4 md:grid-cols-10 md:gap-8;

			& > aside.filters {
				@apply mb-8 flex flex-col gap-4 self-start md:sticky md:top-24 md:col-span-3 md:mb-0;

				// & > div.form-control {
				// 	& > label {
				// 		@apply input-group;

				// 		& > input.input {
				// 			@apply input-bordered w-full;
				// 		}
				// 	}
				// }

				& > ul.menu {
					@apply card-bordered rounded-box menu-horizontal scrollbar__theme w-full flex-nowrap overflow-hidden
						overflow-x-auto bg-base-100/75 shadow-lg backdrop-blur-md backdrop-saturate-200 scrollbar-track-base-200 md:menu-vertical md:max-w-none md:overflow-hidden;
					max-width: calc(100vw - 2rem);

					& > li {
						& > a {
							& > span {
								@apply hidden md:block;
							}

							&.active {
								@apply btn-primary;
							}
						}
					}
				}
			}

			& > section.posts {
				@apply min-h-[75vh] md:col-span-full md:col-start-4;

				& > .page__transition {
					& > h2 {
						@apply mb-8 font-futuristic text-xl text-shadow-rgb md:text-3xl;
					}

					& ul.posts__list {
						@apply flex flex-col gap-4;
					}

					& button.btn__fetch {
						@apply btn-wide btn mx-auto mt-8 flex;
					}
				}
			}
		}
	}

	html.low__end {
		& div.blog {
			& > .blog__layout {
				& > aside.filters {
					& > ul.menu {
						@apply backdrop-blur-none backdrop-saturate-0;
					}
				}
			}
		}
	}
</style>
