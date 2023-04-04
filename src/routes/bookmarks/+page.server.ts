import { RAINDROP_URL, RAINDROP_COLLECTION_ID, RAINDROP_API_KEY } from '$env/static/private';
import type { IRaindrops, ITags } from '$lib/ts/interfaces';

export async function load({ fetch }) {
	const [bookmarks, tags] = await Promise.all([
		fetch(`${RAINDROP_URL}/raindrops/${RAINDROP_COLLECTION_ID}?sort=title&perpage=50`, {
			headers: { Authorization: `Bearer ${RAINDROP_API_KEY}` }
		}).then<IRaindrops>(res => res.json()),
		fetch(`${RAINDROP_URL}/tags/${RAINDROP_COLLECTION_ID}`, {
			headers: { Authorization: `Bearer ${RAINDROP_API_KEY}` }
		}).then<ITags>(res => res.json())
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
