import { RAINDROP_URL, RAINDROP_COLLECTION_ID, RAINDROP_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import qs from 'qs';
import type { IRaindrops } from '$lib/ts';

export const GET = async ({ fetch }) => {
	const query = {
		bookmarks: {
			sort: 'title',
			perpage: 50
		}
	};

	const [bookmarks] = await Promise.all([
		await fetch(
			`${RAINDROP_URL}/raindrops/${RAINDROP_COLLECTION_ID}?${qs.stringify(query.bookmarks, {
				encodeValuesOnly: true
			})}`,
			{
				headers: { Authorization: `Bearer ${RAINDROP_API_KEY}` }
			}
		).then<IRaindrops>(res => res.json())
	]);

	return json(bookmarks);
};
