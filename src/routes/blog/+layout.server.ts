import type { ICMSData, ITag } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour
	}
};

export async function load({ fetch }) {
	const [tags] = await Promise.all([fetch('/api/tags').then<ICMSData<ITag[]>>(res => res.json())]);

	return { tags };
}
