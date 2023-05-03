import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { estimateReadingTime, sortBy } from '$lib/utils';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

export const GET = async ({ fetch, params: { slug } }) => {
	const query = {
		post: {
			populate: '*',
			filters: {
				slug: {
					$eq: slug
				}
			}
		}
	};

	const [post] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.post, { encodeValuesOnly: true })}`
		)
			.then<ICMSData<IPost[]>>(res => res.json())
			.then(res => res.data.at(0) as IPost)
			.then(
				async res =>
					({
						...res,
						readingTime: estimateReadingTime(res.content),
						tags: sortBy(res.tags, 'value')
					} as IPost)
			)
	]);

	return json(post);
};
