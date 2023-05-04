import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import rehypePrism from '@mapbox/rehype-prism';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

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

export const COMPILER_CONFIG = {
	rehypePlugins: [rehypeFormat, rehypeSlug, autolinkHeadings, rehypeExternalLinks] as Plugin[]
};

export const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypePrism, { ignoreMissing: true, alias: { markup: ['svelte'] } })
	.use(COMPILER_CONFIG.rehypePlugins)
	.use(rehypeStringify, { allowDangerousHtml: true });

export const compileContent = async (content: string) => {
	const compiledContent = await markdownProcessor.process(content);

	return compiledContent.value;
};
