import type { IPost } from '$lib/ts';

export const prerender = false;
export const config = {};

export const load = async ({ fetch, params: { slug } }) => {
	const post = await fetch(`/api/posts/${slug}`).then<IPost>(res => res.json());

	return { post };
};
