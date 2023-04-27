import { compileMarkdown } from '$lib/utils';

export const load = async ({ parent }) => {
	const data = await parent();

	const compiledContent = await compileMarkdown(data.post.content);

	return { compiledContent };
};
