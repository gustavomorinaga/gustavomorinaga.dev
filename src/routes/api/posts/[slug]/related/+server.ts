import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

const PAGE_SIZE = 3;

export const GET = async ({ fetch, params: { slug }, url: { searchParams } }) => {
	const tags = searchParams.getAll('tags');

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

	return json(relatedPosts);
};
