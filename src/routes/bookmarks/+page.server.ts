import { sortBy } from '$lib/utils';
import type { IRaindrops, IRaindropTags } from '$lib/ts';

export async function load({ fetch }) {
	const [bookmarks, tags] = await Promise.all([
		fetch('/api/bookmarks').then<IRaindrops>(res => res.json()),
		fetch('/api/bookmarks/tags').then<IRaindropTags>(res => res.json())
	]);

	return {
		bookmarks,
		tags: {
			...tags,
			items: sortBy([{ _id: 'all' }, ...tags.items], '_id')
		}
	};
}
