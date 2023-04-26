import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import qs from 'qs';
import type { ICMSData, ITag } from '$lib/ts';

export const GET = async ({ fetch }) => {
	const query = {
		tags: {
			sort: ['value:asc']
		}
	};

	const [tags] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/tags?${qs.stringify(query.tags, { encodeValuesOnly: true })}`
		).then<ICMSData<ITag[]>>(res => res.json())
	]);

	return json(tags);
};
