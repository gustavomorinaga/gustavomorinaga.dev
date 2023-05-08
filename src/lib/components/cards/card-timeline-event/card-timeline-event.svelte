<script lang="ts">
	import { Icon } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { dateFormatter } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';
	import type { ITimelineEvent } from '$lib/ts';

	export let timelineEvent: ITimelineEvent;
</script>

<article class="event">
	<figure>
		<Icon icon={timelineEvent.icon} size="lg" />
	</figure>

	<div class="card-body">
		<header>
			<h2>{timelineEvent.title}</h2>
			<time>
				{dateFormatter({
					lang: $LANG.code,
					date: new Date(timelineEvent.date),
					dateStyle: 'short'
				})}
			</time>
		</header>

		<p use:balancer>{timelineEvent.description}</p>

		{#if timelineEvent.origin}
			<div class="card-actions">
				<a href={timelineEvent.origin.url} target="_blank" rel="noopener noreferrer">
					{$LANG.about.timeline.visit}
					{timelineEvent.origin.title}
					<Icon icon="external-link" size="xs" />
				</a>
			</div>
		{/if}
	</div>
</article>

<style lang="scss" global>
	article.event {
		@apply card card-side card-compact card-bordered bg-base-100/75 backdrop-blur-md shadow-lg;

		& > figure {
			@apply pl-4 py-4 text-primary;
		}

		& > .card-body {
			& > header {
				@apply flex flex-col md:flex-row justify-between gap-x-4 gap-y-1;

				& > h2 {
					@apply text-lg font-futuristic text-shadow-glow shadow-primary;
				}

				& > time {
					@apply badge tabular-nums;
				}
			}

			& > p {
				@apply text-base;
			}

			& > .card-actions {
				& > a {
					@apply btn btn-outline btn-sm gap-1 text-primary border-base-200
						hover:bg-primary/10 hover:border-base-200 hover:text-primary;
				}
			}
		}
	}

	html.low__end {
		& article.event {
			@apply backdrop-blur-none;
		}
	}
</style>
