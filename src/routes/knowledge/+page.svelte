<script lang="ts">
	import { Icon } from '$lib/components';
	import type { IKnowledge } from '$lib/types';

	const knowledges: IKnowledge = {
		techs: [
			{
				title: 'HTML',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
				icon: 'html5',
				color: '#E34F26'
			},
			{
				title: 'CSS',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
				icon: 'css3',
				color: '#1572B6'
			},
			{
				title: 'Sass',
				url: 'https://sass-lang.com',
				icon: 'sass',
				color: '#CC6699'
			},
			{
				title: 'Tailwind CSS',
				url: 'https://tailwindcss.com',
				icon: 'tailwindcss',
				color: '#06B6D4'
			},
			{
				title: 'Bootstrap',
				url: 'https://getbootstrap.com',
				icon: 'bootstrap',
				color: '#7952B3'
			},
			{
				title: 'JavaScript',
				url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
				icon: 'javascript',
				color: '#F7DF1E'
			},
			{
				title: 'TypeScript',
				url: 'https://www.typescriptlang.org',
				icon: 'typescript',
				color: '#3178C6'
			},
			{
				title: 'Node.js',
				url: 'https://nodejs.org',
				icon: 'nodejs',
				color: '#339933'
			},
			{
				title: 'Express',
				url: 'https://expressjs.com',
				icon: 'express',
				color: '#FFFFFF'
			},
			{
				title: 'PHP',
				url: 'https://www.php.net',
				icon: 'php',
				color: '#777BB4'
			},
			{
				title: 'MySQL',
				url: 'https://www.mysql.com',
				icon: 'mysql',
				color: '#4479A1'
			},
			{
				title: 'MongoDB',
				url: 'https://www.mongodb.com',
				icon: 'mongodb',
				color: '#47A248'
			},
			{
				title: 'React',
				url: 'https://reactjs.org',
				icon: 'react',
				color: '#61DAFB'
			},
			{
				title: 'Expo',
				url: 'https://expo.io',
				icon: 'expo',
				color: '#FFFFFF'
			},
			{
				title: 'Next.js',
				url: 'https://nextjs.org',
				icon: 'nextdotjs',
				color: '#FFFFFF'
			},
			{
				title: 'Chakra-UI',
				url: 'https://chakra-ui.com',
				icon: 'chakraui',
				color: '#319795'
			},
			{
				title: 'Material UI',
				url: 'https://mui.com',
				icon: 'materialui',
				color: '#007FFF'
			},
			{
				title: 'Angular',
				url: 'https://angular.io',
				icon: 'angular',
				color: '#DD0031'
			},
			{
				title: 'PrimeNG',
				url: 'https://www.primefaces.org/primeng',
				icon: 'prime',
				collection: 'prime',
				color: '#DD0031'
			},
			{
				title: 'SvelteKit',
				url: 'https://kit.svelte.dev',
				icon: 'svelte',
				color: '#FF3E00'
			}
		],
		tools: [
			{
				title: 'Git',
				url: 'https://git-scm.com',
				icon: 'git',
				color: '#F05032'
			},
			{
				title: 'GitHub',
				url: 'https://github.com',
				icon: 'github',
				color: '#FFFFFF'
			},
			{
				title: 'Windows Terminal',
				url: 'https://docs.microsoft.com/windows/terminal',
				icon: 'windowsterminal',
				color: '#FFFFFF'
			},
			{
				title: 'Visual Studio Code',
				url: 'https://code.visualstudio.com',
				icon: 'visualstudiocode',
				color: '#007ACC'
			},
			{
				title: 'npm',
				url: 'https://www.npmjs.com',
				icon: 'npm',
				color: '#CB3837'
			},
			{
				title: 'yarn',
				url: 'https://yarnpkg.com',
				icon: 'yarn',
				color: '#007ACC'
			},
			{
				title: 'pnpm',
				url: 'https://pnpm.io',
				icon: 'pnpm',
				color: '#F69220'
			},
			{
				title: 'Webpack',
				url: 'https://webpack.js.org',
				icon: 'webpack',
				color: '#8DD6F9'
			},
			{
				title: 'Babel',
				url: 'https://babeljs.io',
				icon: 'babel',
				color: '#F9DC3E'
			},
			{
				title: 'ESLint',
				url: 'https://eslint.org',
				icon: 'eslint',
				color: '#4B32C3'
			},
			{
				title: 'Prettier',
				url: 'https://prettier.io',
				icon: 'prettier',
				color: '#F7B93E'
			},
			{
				title: 'Markdown',
				url: 'https://markdownguide.org',
				icon: 'markdown',
				color: '#FFFFFF'
			},
			{
				title: 'Insomnia',
				url: 'https://insomnia.rest',
				icon: 'insomnia',
				color: '#4000BF'
			},
			{
				title: 'Vercel',
				url: 'https://vercel.com',
				icon: 'vercel',
				color: '#FFFFFF'
			},
			{
				title: 'Netlify',
				url: 'https://netlify.com',
				icon: 'netlify',
				color: '#00C7B7'
			},
			{
				title: 'Render',
				url: 'https://render.com',
				icon: 'render',
				color: '#46E3B7'
			},
			{
				title: 'Heroku',
				url: 'https://heroku.com',
				icon: 'heroku',
				color: '#430098'
			},
			{
				title: 'Figma',
				url: 'https://figma.com',
				icon: 'figma',
				color: '#F24E1E'
			},
			{
				title: 'Framer',
				url: 'https://framer.com',
				icon: 'framer',
				color: '#0055FF'
			},
			{
				title: 'Notion',
				url: 'https://notion.so',
				icon: 'notion',
				color: '#FFFFFF'
			}
		]
	};
</script>

<svelte:head>
	<title>Gustavo Morinaga Developer</title>
	<meta name="description" content="Gustavo Morinaga Developer" />
</svelte:head>

<div class="hero">
	<div class="hero-content">
		<div class="knowledges">
			{#each knowledges.techs as tech}
				<a
					class="knowledge"
					style="--icon-color: {tech.color}"
					href={tech.url}
					title={tech.title}
					aria-label={tech.title}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon collection={tech.collection || 'simple-icons'} icon={tech.icon} size="xl" />
				</a>
			{/each}
		</div>
	</div>
</div>
<div class="hero">
	<div class="hero-content">
		<div class="knowledges">
			{#each knowledges.tools as tool}
				<a
					class="knowledge"
					style="--icon-color: {tool.color}"
					href={tool.url}
					title={tool.title}
					aria-label={tool.title}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon collection={tool.collection || 'simple-icons'} icon={tool.icon} size="xl" />
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.knowledges {
		@apply flex flex-wrap items-center justify-center gap-4;

		& .knowledge {
			@apply relative z-10 btn btn-ghost border-none h-fit p-4 overflow-hidden shadow-md shadow-black hover:text-[var(--icon-color)] hover:before:bg-gradient-conic hover:before:from-[var(--icon-color)] hover:before:to-black hover:before:animate-spin-background;

			&::before {
				content: '';
				@apply absolute -z-20 -inset-10 bg-[var(--icon-color)] bg-no-repeat transition-all duration-300 ease-in-out;
				background-size: 50% 50%, 50% 50%;
				background-position: 0 0, 100% 0, 100% 100%, 0 100%;
			}
			&::after {
				content: '';
				@apply absolute -z-10 inset-px bg-black;
			}
		}
	}
</style>
