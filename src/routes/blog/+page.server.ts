import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPost, ITag } from '$lib/ts';

const PAGE_SIZE = 3;

export async function load({ fetch }) {
	const query = {
		blog: {
			populate: '*',
			sort: 'publishedAt:desc',
			'pagination[page]': String(1),
			'pagination[pageSize]': String(PAGE_SIZE)
		},
		tags: {
			sort: 'name'
		}
	};

	const [posts, tags] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/blog-posts?${new URLSearchParams(query.blog).toString()}`).then<
			ICMSData<IPost>
		>(res => res.json()),
		fetch(`${PUBLIC_CMS_URL}/api/tags?${new URLSearchParams(query.tags).toString()}`).then<
			ICMSData<ITag>
		>(res => res.json())
	]);

	return { posts, tags, query };
}
