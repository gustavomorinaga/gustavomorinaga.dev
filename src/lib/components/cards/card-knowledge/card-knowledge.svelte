<script lang="ts">
	import { Icon } from '$lib/components';
	import type { IKnowledgePayload } from '$lib/ts';

	export let knowledge: IKnowledgePayload;

	$: ({ title, skills } = knowledge);
</script>

<article class="knowledge">
	<div class="card-body">
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
	</div>
</article>

<style lang="scss" global>
	article.knowledge {
		@apply flex-auto card card-compact md:card-normal card-bordered bg-base-100/75 shadow-lg backdrop-blur-md;

		& > .card-body {
			& h3 {
				@apply text-xl md:text-2xl font-futuristic text-shadow-glow shadow-primary mb-4;
			}

			& > ul {
				@apply flex flex-wrap gap-4 md:gap-8;

				& li {
					@apply tooltip tooltip-bottom lg:hover:text-[var(--icon-color)] transition-colors duration-700 ease-smooth;
				}
			}
		}
	}

	html.low__end {
		& article.knowledge {
			@apply backdrop-blur-none;
		}
	}
</style>
