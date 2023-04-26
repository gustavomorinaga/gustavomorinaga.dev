import type { ICMSData, ITag } from '$lib/ts';

export async function load({ fetch }) {
	const tags = await fetch(`/api/tags`).then<ICMSData<ITag[]>>(res => res.json());

	return { tags };
}
