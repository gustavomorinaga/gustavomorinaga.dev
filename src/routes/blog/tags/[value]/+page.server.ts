import type { ICMSData, IPost } from '$lib/ts';

export const prerender = false;

export async function load({ fetch, params: { value } }) {
	const [{ posts }, { posts: featured }] = await Promise.all([
		fetch(`/api/posts?tag=${value}`).then<{ posts: ICMSData<IPost[]> }>(res => res.json()),
		fetch(`/api/posts?tag=${value}&featured=true`).then<{
			posts: ICMSData<IPost[]>;
		}>(res => res.json())
	]);

	return { posts, featured };
}
