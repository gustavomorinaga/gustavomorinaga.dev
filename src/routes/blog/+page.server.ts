import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPost, ITag } from '$lib/ts';

export async function load({ fetch }) {
	const [posts, tags] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/blog-posts?populate=*&sort=publishedAt%3Adesc`).then<
			ICMSData<IPost>
		>(res => res.json()),
		fetch(`${PUBLIC_CMS_URL}/api/tags?sort=name`).then<ICMSData<ITag>>(res => res.json())
	]);

	return { posts, tags };
}
