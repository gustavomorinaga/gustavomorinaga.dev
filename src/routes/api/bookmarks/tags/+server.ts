import { RAINDROP_URL, RAINDROP_COLLECTION_ID, RAINDROP_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { IRaindropTags } from '$lib/ts';

export const GET = async ({ fetch }) => {
	const [tags] = await Promise.all([
		fetch(`${RAINDROP_URL}/tags/${RAINDROP_COLLECTION_ID}`, {
			headers: { Authorization: `Bearer ${RAINDROP_API_KEY}` }
		}).then<IRaindropTags>(res => res.json())
	]);

	return json(tags);
};
