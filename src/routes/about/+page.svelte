<script lang="ts">
	import { Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { balancer } from 'svelte-action-balancer';
</script>

<Metadata title={$LANG.about.metadata.title} description={$LANG.about.metadata.description} />

<article class="history">
	<h1>{$LANG.about.title}</h1>

	<span use:balancer>
		{@html $LANG.about.paragraph}
	</span>
</article>

<style lang="scss" global>
	article.history {
		@apply block;

		& h1 {
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > span {
			& p {
				@apply relative text-base md:text-lg;

				&::before {
					content: '';
					@apply absolute inset-0 -z-10 rounded-2xl bg-black/50 blur-xl;
				}
			}

			& br {
				content: '';
				@apply mb-4 block;
			}

			& a {
				@apply link-hover link-primary;
			}
		}
	}

	html.low__end {
		& article.history {
			& > span {
				& p {
					@apply before:hidden;
				}
			}
		}
	}
</style>
