<script lang="ts">
	import { CardKnowledge, Metadata } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';
	import type { IKnowledgePayload } from '$lib/ts';

	$: knowledges = [
		{ title: $LANG.about.knowledge.languages, skills: getKnowledge('techs', 'language') },
		{ title: $LANG.about.knowledge.runtime, skills: getKnowledge('techs', 'runtime') },
		{ title: $LANG.about.knowledge.frameworks, skills: getKnowledge('techs', 'framework') },
		{ title: $LANG.about.knowledge.libs, skills: getKnowledge('techs', 'lib') },
		{ title: $LANG.about.knowledge.databases, skills: getKnowledge('techs', 'database') },
		{ title: $LANG.about.knowledge.styling, skills: getKnowledge('techs', 'styling') },
		{ title: $LANG.about.knowledge.plugins, skills: getKnowledge('tools', 'plugin') },
		{
			title: $LANG.about.knowledge.packageManagers,
			skills: getKnowledge('tools', 'package-manager')
		},
		{ title: $LANG.about.knowledge.bundlers, skills: getKnowledge('tools', 'bundler') },
		{
			title: $LANG.about.knowledge.versionControl,
			skills: getKnowledge('tools', 'version-control')
		},
		{ title: $LANG.about.knowledge.platforms, skills: getKnowledge('tools', 'platform') },
		{ title: $LANG.about.knowledge.tools, skills: getKnowledge('tools', 'tool') }
	] satisfies IKnowledgePayload[];

	const getKnowledge = (section: 'techs' | 'tools', category: string) =>
		profileJSON.knowledge[section].filter(
			t => t.category === category
		) as IKnowledgePayload['skills'];
</script>

<Metadata
	title={$LANG.about.knowledge.metadata.title}
	description={$LANG.about.knowledge.metadata.description}
/>

<section class="knowledges">
	<h1>{$LANG.about.knowledge.title}</h1>

	<div class="knowledges__content">
		{#each knowledges as knowledge}
			<CardKnowledge {knowledge} />
		{/each}
	</div>
</section>

<style lang="scss" global>
	section.knowledges {
		@apply block;

		& > h1 {
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > div.knowledges__content {
			@apply flex flex-wrap gap-4;
		}
	}
</style>
