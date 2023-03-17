<script lang="ts">
	import { Icon, Metadata } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';

	$: knowledges = [
		{ title: $LANG.about.knowledge.languages, knowledge: getKnowledge('techs', 'language') },
		{ title: $LANG.about.knowledge.runtime, knowledge: getKnowledge('techs', 'runtime') },
		{ title: $LANG.about.knowledge.libs, knowledge: getKnowledge('techs', 'lib') },
		{ title: $LANG.about.knowledge.frameworks, knowledge: getKnowledge('techs', 'framework') },
		{ title: $LANG.about.knowledge.databases, knowledge: getKnowledge('techs', 'database') },
		{
			title: $LANG.about.knowledge.versionControl,
			knowledge: getKnowledge('tools', 'version-control')
		},
		{
			title: $LANG.about.knowledge.packageManagers,
			knowledge: getKnowledge('tools', 'package-manager')
		},
		{ title: $LANG.about.knowledge.platforms, knowledge: getKnowledge('tools', 'platform') },
		{ title: $LANG.about.knowledge.plugins, knowledge: getKnowledge('tools', 'plugin') },
		{ title: $LANG.about.knowledge.bundlers, knowledge: getKnowledge('tools', 'bundler') },
		{ title: $LANG.about.knowledge.compilers, knowledge: getKnowledge('tools', 'compiler') },
		{ title: $LANG.about.knowledge.tools, knowledge: getKnowledge('tools', 'tool') }
	];

	const getKnowledge = (section: 'techs' | 'tools', category: string) =>
		profileJSON.knowledge[section].filter(t => t.category === category);
</script>

<Metadata
	title={$LANG.about.knowledge.metadata.title}
	description={$LANG.about.knowledge.metadata.description}
/>

<article class="knowledge">
	<h1>{$LANG.about.knowledge.title}</h1>

	<div class="knowledge__content">
		{#each knowledges as { title, knowledge }}
			<article>
				<h3>{title}</h3>

				<ul>
					{#each knowledge as { icon, collection, title, url, color }}
						<li data-tip={title} style="--icon-color: {color}">
							<a href={url} target="_blank" rel="noopener noreferrer">
								<Icon {icon} {collection} size="lg" />
							</a>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</article>

<style lang="scss" global>
	article.knowledge {
		& h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& .knowledge__content {
			@apply flex flex-wrap gap-4 max-h-[35rem] pr-4 overflow-y-auto scrollbar__theme;

			& > article {
				@apply flex-auto card card-bordered p-8 bg-base-100/50 shadow-lg  backdrop-blur-md;

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
		}
	}
</style>
