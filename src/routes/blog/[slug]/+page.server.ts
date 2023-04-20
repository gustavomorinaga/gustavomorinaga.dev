import { PUBLIC_CMS_URL } from '$env/static/public';
import { estimateReadingTime } from '$lib/utils';
import { compile } from 'mdsvex';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

export const load = async ({ fetch, params: { slug } }) => {
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
			.then<ICMSData<IPost>>(res => res.json())
			.then(res => res.data[0])
			.then(async res => ({
				...res,
				content: (await compile(res.content))?.code,
				readingTime: estimateReadingTime(res.content)
			}))
	]);

	return { post };
};
