<script lang="ts">
	import { dev } from '$app/environment';
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import { Metadata } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';

	export let data;

	const HOST = dev ? PUBLIC_CMS_URL : '';
</script>

<Metadata title={$LANG.blog.metadata.title} description={$LANG.blog.metadata.description} />

<code class="typewriter blog">profile<span class="method">.blog()</span>;</code>

<div class="blog">
	<h1>{$LANG.blog.title}</h1>

	<p>{$LANG.blog.paragraph}</p>

	{#if data.posts?.data.length}
		<ul>
			{#each data.posts.data as { title, description, slug, cover }}
				<li>
					<a class="post" href="/blog/{slug}">
						<figure>
							<img src={HOST + cover.url} alt={cover.alternativeText || description} />
						</figure>

						<div class="card-body">
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
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

		& > ul {
			@apply grid grid-cols-3 gap-4;

			& > li {
				& > a.post {
					@apply card card-bordered image-full bg-base-100/75 shadow-lg backdrop-blur-md transition duration-700 ease-smooth;

					@media (hover: hover) {
						&:hover {
							@apply no-underline border-primary shadow-glow shadow-primary/10;

							& .external {
								@apply opacity-100;
							}
						}
					}

					& .card-body {
						& > h3 {
							@apply text-2xl font-futuristic text-shadow-glow shadow-primary;
						}

						& > p {
							@apply text-lg;
						}
					}
				}
			}
		}
	}
</style>
