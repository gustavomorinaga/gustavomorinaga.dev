<script lang="ts">
	import { CardTimelineEvent, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import type { ITimelineEvent } from '$lib/ts';

	$: timeline = [
		{
			title: $LANG.about.timeline.events.websiteLaunch.title,
			description: $LANG.about.timeline.events.websiteLaunch.description,
			icon: 'rocket',
			date: '2023-04-28'
		},
		{
			title: $LANG.about.timeline.events.endFatec.title,
			description: $LANG.about.timeline.events.endFatec.description,
			icon: 'school',
			date: '2023-02-14',
			origin: {
				title: 'Fatec São Roque',
				url: 'https://fatecsaoroque.edu.br'
			}
		},
		{
			title: $LANG.about.timeline.events.promoADV.title,
			description: $LANG.about.timeline.events.promoADV.description,
			icon: 'trophy',
			date: '2022-01-01',
			origin: {
				title: 'ADV Tecnologia',
				url: 'https://advtecnologia.com.br'
			}
		},
		{
			title: $LANG.about.timeline.events.startADV.title,
			description: $LANG.about.timeline.events.startADV.description,
			icon: 'briefcase',
			date: '2022-01-01',
			origin: {
				title: 'ADV Tecnologia',
				url: 'https://advtecnologia.com.br'
			}
		},
		{
			title: $LANG.about.timeline.events.internshipADV.title,
			description: $LANG.about.timeline.events.internshipADV.description,
			icon: 'briefcase',
			date: '2021-01-11',
			origin: {
				title: 'ADV Tecnologia',
				url: 'https://advtecnologia.com.br'
			}
		},
		{
			title: $LANG.about.timeline.events.startFatec.title,
			description: $LANG.about.timeline.events.startFatec.description,
			icon: 'book-2',
			date: '2020-02-11',
			origin: {
				title: 'Fatec São Roque',
				url: 'https://fatecsaoroque.edu.br'
			}
		},
		{
			title: $LANG.about.timeline.events.endEtec.title,
			description: $LANG.about.timeline.events.endEtec.description,
			icon: 'certificate',
			date: '2019-10-20',
			origin: {
				title: 'Etec São Roque',
				url: 'https://www.etecsr.com.br'
			}
		},
		{
			title: $LANG.about.timeline.events.highSchool.title,
			description: $LANG.about.timeline.events.highSchool.description,
			icon: 'school',
			date: '2018-12-16'
		},
		{
			title: $LANG.about.timeline.events.startEtec.title,
			description: $LANG.about.timeline.events.startEtec.description,
			icon: 'book-2',
			date: '2018-07-04',
			origin: {
				title: 'Etec São Roque',
				url: 'https://www.etecsr.com.br'
			}
		}
	] as ITimelineEvent[];
</script>

<Metadata
	title={$LANG.about.timeline.metadata.title}
	description={$LANG.about.timeline.metadata.description}
/>

<section class="timeline">
	<h1>{$LANG.about.timeline.title}</h1>

	<ul class="events">
		{#each timeline as timelineEvent}
			<li>
				<CardTimelineEvent {timelineEvent} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss" global>
	section.timeline {
		@apply block;

		& > h1 {
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > ul.events {
			@apply flex flex-col gap-8;

			& > li {
				&:last-child {
					& > article.event {
						&::after {
							@apply hidden;
						}
					}
				}

				& > article.event {
					&::after {
						content: '';
						@apply absolute inset-x-0 -bottom-[2.1rem] mx-auto h-[2.1rem] w-[2px] bg-base-200;
					}
				}
			}
		}
	}
</style>
