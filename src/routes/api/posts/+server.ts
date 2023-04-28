import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { sortBy } from '$lib/utils';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE_OPTIONS = {
	page: 10,
	featured: 5
};

export const GET = async ({ fetch, url: { searchParams } }) => {
	const page = Number(searchParams.get('page')) || 1;
	const tag = searchParams.get('tag');

	const filterByTag = { filters: { tags: { value: { $in: [tag] } } } };

	const query = {
		blog: {
			populate: ['cover', 'tags'],
			sort: ['publishedAt:desc'],
			pagination: {
				page,
				pageSize: PAGE_SIZE_OPTIONS.page
			},
			...(tag && filterByTag)
		},
		featured: {
			populate: ['cover', 'tags'],
			sort: ['postViews.views:desc'],
			pagination: {
				page,
				pageSize: PAGE_SIZE_OPTIONS.featured
			},
			...(tag && filterByTag)
		}
	};

	const currentQuery = searchParams.get('featured') ? query.featured : query.blog;

	const [posts] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(currentQuery, { encodeValuesOnly: true })}`
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

	return json({ posts, query: currentQuery });
};
