import { PUBLIC_CMS_URL } from '$env/static/public';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 3;

export async function load({ fetch }) {
	const query = {
		blog: {
			populate: ['cover', 'tags'],
			sort: ['publishedAt:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE
			}
		}
	};

	const [posts] = await Promise.all([
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
			}))
	]);

	return { posts, query };
}
