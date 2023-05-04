import { compileContent } from '$lib/utils';

export const load = async ({ parent }) => {
	const data = await parent();

	const content = await compileContent(data.post.content);

	return { content };
};
