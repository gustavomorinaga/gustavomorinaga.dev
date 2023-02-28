<script lang="ts">
	import { Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
</script>

<Metadata title={$LANG.about.metadata.title} description={$LANG.about.metadata.description} />

<article class="history">
	<h1>{$LANG.about.title}</h1>

	{@html $LANG.about.paragraph}
</article>

<style lang="scss" global>
	.history {
		& h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& p {
			@apply text-base md:text-lg text-shadow-md shadow-black;
		}

		& br {
			content: '';
			@apply block mb-4;
		}

		& a {
			@apply link-primary link-hover;
		}
	}
</style>
