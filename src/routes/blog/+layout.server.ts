import type { ICMSData, IPost, ITag } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour
	}
};

export async function load({ fetch }) {
	const [featured, tags] = await Promise.all([
		fetch('/api/posts/featured').then<ICMSData<IPost[]>>(res => res.json()),
		fetch('/api/tags').then<ICMSData<ITag[]>>(res => res.json())
	]);

	return { featured, tags };
}
