import { sortBy } from '$lib/utils';
import type { IRaindrops, IRaindropTags } from '$lib/ts';

export async function load({ fetch }) {
	const [bookmarks, tags] = await Promise.all([
		fetch('/api/bookmarks').then<IRaindrops>(res => res.json()),
		fetch('/api/bookmarks/tags').then<IRaindropTags>(res => res.json())
	]);

	const mappedTags = [
		...tags.items,
		{ _id: 'all', count: tags.items.reduce((acc, curr) => acc + curr.count, 0) }
	];

	return {
		bookmarks,
		tags: {
			...tags,
			items: sortBy(mappedTags, '_id')
		}
	};
}
