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
			items: [
				...tags.items,
				{ _id: 'all', count: tags.items.reduce((acc, curr) => acc + curr.count, 0) }
			].sort((a, b) => a._id.localeCompare(b._id))
		}
	};
}
