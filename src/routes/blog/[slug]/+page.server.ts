import { compileContent } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { IPost } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour
	}
};

export const load = async ({ fetch, params: { slug } }) => {
	const response = await fetch(`/api/posts/${slug}`);
	if (!response.ok) throw error(404, 'Not Found');

	const post: IPost = await response.json();
	const content = await compileContent(post.content);

	return { post, content };
};
