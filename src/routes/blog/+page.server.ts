import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPost } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const posts: ICMSData<IPost> = await fetch(`${PUBLIC_CMS_URL}/api/blog-posts?populate=*`).then(
		res => res.json()
	);

	return { posts };
}) satisfies PageServerLoad;
