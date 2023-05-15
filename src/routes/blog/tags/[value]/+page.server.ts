import { PUBLIC_CMS_URL } from '$env/static/public';
import { sortBy } from '$lib/utils';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 10;

export async function load({ fetch, params: { value: tag } }) {
	const filterByTag = { filters: { tags: { value: { $in: [tag] } } } };

	const query = {
		blog: {
			populate: ['cover', 'tags'],
			sort: ['publishedAt:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE
			},
			...(tag && filterByTag)
		}
	};

	const [posts] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.blog, { encodeValuesOnly: true })}`
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

	return { posts, tag: posts.data.at(0)?.tags.find(t => t.value === tag) };
}
