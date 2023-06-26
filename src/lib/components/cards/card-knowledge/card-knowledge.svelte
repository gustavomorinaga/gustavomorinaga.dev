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
		@apply card-bordered card card-compact flex-auto bg-base-100/75 shadow-lg backdrop-blur-md md:card-normal;

		& > .card-body {
			& h3 {
				@apply mb-4 font-futuristic text-xl shadow-primary text-shadow-glow md:text-2xl;
			}

			& > ul {
				@apply flex flex-wrap gap-4 md:gap-8;

				& li {
					@apply tooltip tooltip-bottom transition-colors duration-700 ease-smooth lg:hover:text-[var(--icon-color)];
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
