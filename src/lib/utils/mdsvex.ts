import { compile, type MdsvexCompileOptions } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

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

const CONFIG: MdsvexCompileOptions = {
	rehypePlugins: [
		rehypeSlug,
		autolinkHeadings,
		rehypeExternalLinks
	] as MdsvexCompileOptions['rehypePlugins']
};

export const compileMarkdown = async (content: string) => {
	const compiled = await compile(content, CONFIG);
	if (!compiled?.code) return '';

	return cleanMDX(compiled.code);
};

/** Temporary cleaner MDX implementation, because mdsvex `compile` still buggy */
export const cleanMDX = (content: string) => {
	return content
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');
};
