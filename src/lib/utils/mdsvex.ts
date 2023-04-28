import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import type { MdsvexCompileOptions } from 'mdsvex';

const autolinkHeadings = () =>
	rehypeAutolinkHeadings({
		behavior: 'prepend',
		properties: {
			class: 'heading-link'
		},
		content: {
			type: 'text',
			value: '#'
		}
	});

export const COMPILER_CONFIG: MdsvexCompileOptions = {
	extensions: ['.svelte'],
	rehypePlugins: [
		rehypeSlug,
		autolinkHeadings,
		rehypeExternalLinks
	] as MdsvexCompileOptions['rehypePlugins']
};
