import type { ICMSData, IPost } from '$lib/ts';

export const prerender = false;

export async function load({ fetch }) {
	const [{ posts }, { posts: featured }] = await Promise.all([
		fetch('/api/posts').then<{ posts: ICMSData<IPost[]> }>(res => res.json()),
		fetch('/api/posts?featured=true').then<{
			posts: ICMSData<IPost[]>;
		}>(res => res.json())
	]);

	return { posts, featured };
}
