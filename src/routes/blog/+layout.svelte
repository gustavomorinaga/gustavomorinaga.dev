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
				<label class="input-group">
					<span>
						<Icon icon="search" size="sm" />
					</span>

					<input
						class="input input-bordered w-full"
						type="text"
						name="term"
						id="term"
						placeholder={$LANG.blog.placeholder}
					/>
				</label>
			</div>

			<ul class="menu">
				<li>
					<a href="/blog" class:bg-primary={!$page.params.value} on:click={scrollToTop}>
						<Icon icon="stack-2" />
						{$LANG.blog.filters.all}
					</a>
				</li>
				{#each tags.data as tag (tag.id)}
					<li>
						<a
							class:bg-primary={$page.params.value === tag.value}
							href="/blog/tags/{tag.value}"
							on:click={scrollToTop}
						>
							<Icon icon={tag.icon} collection={tag.collection} />
							{tag.label}
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
			@apply grid grid-cols-10 gap-y-4 md:gap-8;

			& > aside.filters {
				@apply sticky top-24 col-span-3 self-start flex flex-col gap-4;

				& > input.search {
					@apply input input-bordered;
				}

				& > ul.menu {
					@apply card-bordered rounded-box overflow-hidden bg-base-100/75 shadow-lg backdrop-blur-md;
				}
			}

			& > section.posts {
				@apply col-span-full md:col-start-4 min-h-[75vh];

				& > .page__transition {
					@apply flex flex-col gap-8;

					& ul.posts__list {
						@apply flex flex-col gap-4;

						& > li {
							& > a.post {
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
						}
					}
				}
			}
		}
	}
</style>
