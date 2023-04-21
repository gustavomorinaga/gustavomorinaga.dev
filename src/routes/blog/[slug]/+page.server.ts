import { PUBLIC_CMS_URL } from '$env/static/public';
import { compileMarkdown, estimateReadingTime } from '$lib/utils';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 3;

export const load = async ({ fetch, params: { slug } }) => {
	const query = {
		post: {
			populate: '*',
			filters: {
				slug: {
					$eq: slug
				}
			}
		},
		relatedPosts: {
			sort: ['views:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE
			},
			filters: {}
		}
	};

	const post = await fetch(
		`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.post, { encodeValuesOnly: true })}`
	)
		.then<ICMSData<IPost>>(res => res.json())
		.then(res => res.data.at(0) as IPost)
		.then(async res => ({
			...res,
			content: await compileMarkdown(res.content),
			readingTime: estimateReadingTime(res.content),
			tags: res.tags.sort((a, b) => a.value.localeCompare(b.value))
		}));

	query.relatedPosts = {
		...query.relatedPosts,
		filters: {
			slug: {
				$ne: post.slug
			},
			tags: {
				value: {
					$in: [...post.tags.map(t => t.value)]
				}
			}
		}
	};

	const relatedPosts = await fetch(
		`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.relatedPosts, {
			encodeValuesOnly: true
		})}`
	).then<ICMSData<IPost>>(res => res.json());

	return { post, relatedPosts };
};
