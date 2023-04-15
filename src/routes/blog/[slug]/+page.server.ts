import { PUBLIC_CMS_URL } from '$env/static/public';
import { compile } from 'mdsvex';
import type { ICMSData, IPost } from '$lib/ts';

export const load = async ({ fetch, params: { slug } }) => {
	const query = new URLSearchParams({
		'filters[slug][$eq]': slug,
		populate: '*'
	}).toString();

	const [post] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/blog-posts?${query}`)
			.then<ICMSData<IPost>>(res => res.json())
			.then(res => res.data[0])
			.then(async res => ({ ...res, content: (await compile(res.content))?.code }))
	]);

	return { post };
};
