import qs from 'qs';
import type { ICMSData, IPost } from '$lib/ts';

export const load = async ({ fetch, params: { slug } }) => {
	const post = await fetch(`/api/posts/${slug}`).then<IPost>(res => res.json());

	const query = {
		related: {
			tags: post.tags.map(t => t.value)
		}
	};

	const relatedPosts = await fetch(
		`/api/posts/${slug}/related?${qs.stringify(query.related, {
			encodeValuesOnly: true,
			arrayFormat: 'repeat'
		})}`
	).then<ICMSData<IPost[]>>(res => res.json());

	return { post, relatedPosts };
};
