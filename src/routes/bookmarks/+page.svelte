<script lang="ts">
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { dev } from '$app/environment';
	import { Icon } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';
	import { animateOnScroll } from '$lib/utils';
	import { intersect } from '@svelte-put/intersect';

	const baseURL = dev ? '' : PUBLIC_DOMAIN;
</script>

<code class="bookmarks">profile<span class="method">.bookmarks()</span>;</code>

<article class="bookmarks" in:fly={{ y: 50, duration: 1000, delay: 2000, easing: cubicOut }}>
	<h1>{$LANG.bookmarks.title}</h1>

	<p>{$LANG.bookmarks.paragraph}</p>

	<small>
		{$LANG.bookmarks.small}

		<a
			class="btn btn-primary btn-xs gap-1"
			href={`${baseURL}/files/htmls/bookmarks-${$LANG.code}.html`}
			target="_blank"
			rel="noopener noreferrer"
			download
		>
			<Icon icon="download" size="xs" />
			{$LANG.bookmarks.download}
		</a>
	</small>

	<ul>
		{#each profileJSON.bookmarks as { title, description, url, category, icon }, index}
			<li
				style="--order: {index + 1};"
				use:intersect={{ threshold: 0.5 }}
				on:intersect={animateOnScroll}
			>
				<a
					class="bookmark"
					href={url}
					{title}
					aria-label={title}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div class="external">
						<Icon icon="external-link" />
					</div>

					<div class="card-body">
						<header>
							<h2>{title}</h2>
							<span class="category">
								<Icon {icon} size="xs" />
								{category}
							</span>
						</header>

						<p>{description}</p>
					</div>
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
			@apply text-xl mb-2;

			& > a {
				@apply link-primary link-hover;
			}
		}

		& small {
			@apply flex flex-wrap items-center gap-4 text-base mb-8;
		}

		& > ul {
			@apply grid grid-cols-1 md:grid-cols-2 gap-4;

			& .bookmark {
				@apply card card-side card-compact card-bordered h-full bg-base-100/50 shadow-lg backdrop-blur-md transition duration-700 ease-smooth;

				@media (hover: hover) {
					&:hover {
						@apply no-underline border-primary shadow-glow shadow-primary/10;

						& .external {
							@apply opacity-100;
						}
					}
				}

				& figure {
					@apply items-start my-4 ml-4 text-primary;
				}

				& .external {
					@apply absolute top-2 right-2 text-base-content opacity-0 transition-opacity duration-300 ease-out;
				}

				& .card-body {
					@apply max-w-[70vw] md:max-w-full;

					& header {
						@apply flex items-center gap-2;

						& h2 {
							@apply text-xl text-base-content font-futuristic text-shadow-glow shadow-primary;
						}

						& .category {
							@apply badge gap-1;
						}
					}

					& p {
						@apply text-base text-base-content;
					}
				}
			}
		}
	}
</style>
