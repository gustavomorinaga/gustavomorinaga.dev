import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 9;

export async function load({ fetch }) {
	const query = {
		blog: {
			populate: '*',
			sort: 'publishedAt:desc',
			'pagination[page]': String(1),
			'pagination[pageSize]': String(PAGE_SIZE)
		}
	};

	const [posts] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/blog-posts?${new URLSearchParams(query.blog).toString()}`).then<
			ICMSData<IPost>
		>(res => res.json())
	]);

	return { posts, query };
}
