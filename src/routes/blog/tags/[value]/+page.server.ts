import { PUBLIC_CMS_URL } from '$env/static/public';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE_OPTIONS = {
	page: 10,
	featured: 5
};

export async function load({ fetch, params: { value } }) {
	const query = {
		blog: {
			populate: ['cover', 'tags'],
			filters: {
				tags: {
					value: {
						$in: [value]
					}
				}
			},
			sort: ['publishedAt:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE_OPTIONS.page
			}
		},
		featured: {
			populate: ['cover', 'tags'],
			filters: {
				tags: {
					value: {
						$in: [value]
					}
				}
			},
			sort: ['postViews.views:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE_OPTIONS.featured
			}
		}
	};

	const [posts, featured] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.blog, { encodeValuesOnly: true })}`
		)
			.then<ICMSData<IPost>>(res => res.json())
			.then(res => ({
				...res,
				data: res.data.map(p => ({
					...p,
					tags: p.tags.sort((a, b) => a.value.localeCompare(b.value))
				}))
			})),
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.featured, { encodeValuesOnly: true })}`
		)
			.then<ICMSData<IPost>>(res => res.json())
			.then(res => ({
				...res,
				data: res.data.map(p => ({
					...p,
					tags: p.tags.sort((a, b) => a.value.localeCompare(b.value))
				}))
			}))
	]);

	return { posts, featured, query };
}
