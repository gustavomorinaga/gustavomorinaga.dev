import { compileContent } from '$lib/utils';
import type { IPost } from '$lib/ts';
import { error } from '@sveltejs/kit';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60
	}
};

export const load = async ({ fetch, params: { slug } }) => {
	const post = await fetch(`/api/posts/${slug}`);
	if (!post.ok) throw error(404, 'Not Found');

	const data: IPost = await post.json();
	const content = await compileContent(data.content);

	return { post: data, content };
};
