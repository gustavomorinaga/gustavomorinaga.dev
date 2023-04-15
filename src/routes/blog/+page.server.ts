import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPost } from '$lib/ts';

export async function load({ fetch }) {
	const [posts] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/blog-posts?populate=*`)
			.then<ICMSData<IPost>>(res => res.json())
			.catch(error => {
				console.error(error);

				return null;
			})
	]);

	return { posts };
}
