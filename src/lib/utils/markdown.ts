import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

const autolinkHeadings = () =>
	rehypeAutolinkHeadings({
		behavior: 'prepend',
		properties: {
			class: 'heading-link',
			href: 'hello'
		},
		content: {
			type: 'text',
			value: '#'
		}
	});

export const COMPILER_CONFIG = {
	remarkPlugins: [remarkParse, remarkGfm] as Plugin[],
	rehypePlugins: [rehypeFormat, rehypeSlug, autolinkHeadings] as Plugin[]
};

export const markdownProcessor = unified()
	.data('settings', { fragment: true })
	.use(COMPILER_CONFIG.remarkPlugins)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(COMPILER_CONFIG.rehypePlugins)
	.use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
	.use(rehypePrism, { ignoreMissing: true, alias: { markup: ['svelte'] } })
	.use(rehypeStringify, { allowDangerousHtml: true });

export const compileContent = async (content: string) => {
	const compiledContent = await markdownProcessor.process(content);

	return compiledContent.value;
};
