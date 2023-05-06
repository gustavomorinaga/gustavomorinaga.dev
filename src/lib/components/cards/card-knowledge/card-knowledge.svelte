<script lang="ts">
	import { Icon } from '$lib/components';
	import type { IKnowledgePayload } from '$lib/ts';

	export let knowledge: IKnowledgePayload;

	const { title, skills } = knowledge;
</script>

<article class="knowledge">
	<h3>{title}</h3>

	<ul>
		{#each skills as { icon, collection, title, url, color }}
			<li data-tip={title} style="--icon-color: {color}">
				<a href={url} target="_blank" rel="noopener noreferrer">
					<Icon {icon} {collection} size="lg" />
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss" global>
	article.knowledge {
		@apply flex-auto card card-bordered p-8 bg-base-100/75 shadow-lg backdrop-blur-md;

		& h3 {
			@apply text-2xl font-futuristic text-shadow-glow shadow-primary mb-4;
		}

		& > ul {
			@apply flex flex-wrap gap-8;

			& li {
				@apply tooltip tooltip-bottom lg:hover:text-[var(--icon-color)] transition-colors duration-700 ease-smooth;
			}
		}
	}
</style>
