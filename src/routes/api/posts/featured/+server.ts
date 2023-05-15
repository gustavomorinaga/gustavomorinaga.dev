import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { sortBy } from '$lib/utils';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 5;

export const GET = async ({ fetch }) => {
	const query = {
		featured: {
			populate: ['cover', 'tags'],
			sort: ['postViews.views:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE
			}
		}
	};

	const [featured] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.featured, { encodeValuesOnly: true })}`
		)
			.then<ICMSData<IPost[]>>(res => res.json())
			.then(res => ({
				...res,
				data: res.data.map(p => ({
					...p,
					tags: sortBy(p.tags, 'value')
				}))
			}))
	]);

	return json(featured);
};
