import { COMPILER_CONFIG } from '$lib/utils';
import { compile } from 'mdsvex';

export const load = async ({ parent }) => {
	const data = await parent();

	const compiledContent = await compile(data.post.content, COMPILER_CONFIG);
	const content = compiledContent?.code
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');

	return { content };
};
