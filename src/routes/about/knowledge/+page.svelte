<script lang="ts">
	import { Icon, Metadata } from '$lib/components';
	import { profileJSON } from '$lib/databases';
	import { LANG } from '$lib/stores';
</script>

<Metadata
	title={$LANG.about.knowledge.metadata.title}
	description={$LANG.about.knowledge.metadata.description}
/>

<article class="knowledge">
	<h1>{$LANG.about.knowledge.title}</h1>

	<div class="knowledge__content">
		<article>
			<h3>{$LANG.about.knowledge.languages}</h3>

			<ul>
				{#each profileJSON.knowledge.techs.filter(t => t.category === 'language') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.runtime}</h3>

			<ul>
				{#each profileJSON.knowledge.techs.filter(t => t.category === 'runtime') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.libs}</h3>

			<ul>
				{#each profileJSON.knowledge.techs.filter(t => t.category === 'lib') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.frameworks}</h3>

			<ul>
				{#each profileJSON.knowledge.techs.filter(t => t.category === 'framework') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.databases}</h3>

			<ul>
				{#each profileJSON.knowledge.techs.filter(t => t.category === 'database') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.versionControl}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'version-control') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.packageManagers}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'package-manager') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.platforms}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'platform') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.plugins}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'plugin') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.bundlers}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'bundler') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.compilers}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'compiler') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>

		<article>
			<h3>{$LANG.about.knowledge.tools}</h3>

			<ul>
				{#each profileJSON.knowledge.tools.filter(t => t.category === 'tool') as { icon, collection, title, url, color }}
					<li data-tip={title} style="--icon-color: {color}">
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon {icon} {collection} size="lg" />
						</a>
					</li>
				{/each}
			</ul>
		</article>
	</div>
</article>

<style lang="scss" global>
	.knowledge {
		& h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& .knowledge__content {
			@apply flex flex-1 flex-wrap gap-4 max-h-[35rem] pr-4 overflow-y-auto scrollbar__theme;

			& > article {
				@apply card card-bordered flex-grow p-8 bg-base-100/50 shadow-lg shadow-black backdrop-blur-md;

				& h3 {
					@apply text-2xl font-futuristic text-shadow-glow shadow-primary mb-4;
				}

				& > ul {
					@apply flex flex-wrap gap-8;

					& li {
						@apply tooltip tooltip-bottom hover:text-[var(--icon-color)] transition-colors duration-700 ease-smooth;
					}
				}
			}
		}
	}
</style>
