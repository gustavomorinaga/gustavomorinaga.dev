import { compileContent } from '$lib/utils';
import type { IPost } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60
	}
};

export const load = async ({ fetch, params: { slug } }) => {
	const post = await fetch(`/api/posts/${slug}`).then<IPost>(res => res.json());
	const content = await compileContent(post.content);

	return { post, content };
};
