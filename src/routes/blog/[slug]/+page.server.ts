import { COMPILER_CONFIG, clearExtraContent } from '$lib/utils';
import { compile } from 'mdsvex';

export const prerender = 'auto';

export const load = async ({ parent }) => {
	const data = await parent();

	const compiledContent = await compile(data.post.content, COMPILER_CONFIG);
	const content = clearExtraContent(compiledContent?.code);

	return { content };
};
