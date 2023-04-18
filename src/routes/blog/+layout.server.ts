import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, ITag } from '$lib/ts';

export async function load({ fetch }) {
	const query = {
		tags: {
			sort: 'value'
		}
	};

	const [tags] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/tags?${new URLSearchParams(query.tags).toString()}`).then<
			ICMSData<ITag>
		>(res => res.json())
	]);

	return { tags, query };
}
