import { PUBLIC_CMS_URL } from '$env/static/public';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 3;

export const prerender = 'auto';
export const config = {};

export const load = async ({ fetch, params: { slug } }) => {
	const post = await fetch(`/api/posts/${slug}`).then<IPost>(res => res.json());

	const tags = post.tags.map(t => t.value);

	const query = {
		relatedPosts: {
			sort: ['postViews.views:desc'],
			pagination: {
				page: 1,
				pageSize: PAGE_SIZE
			},
			filters: {
				slug: {
					$ne: slug
				},
				tags: {
					value: {
						$in: tags
					}
				}
			}
		}
	};

	const [relatedPosts] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/blog-posts?${qs.stringify(query.relatedPosts, {
				encodeValuesOnly: true
			})}`
		).then<ICMSData<IPost[]>>(res => res.json())
	]);

	return { post, relatedPosts };
};
