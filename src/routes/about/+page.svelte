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
			@apply text-3xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& > span {
			& p {
				@apply relative text-base md:text-lg;

				&::before {
					content: '';
					@apply absolute -z-10 inset-0 rounded-2xl bg-black/50 blur-xl;
				}
			}

			& br {
				content: '';
				@apply block mb-4;
			}

			& a {
				@apply link-primary link-hover;
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
