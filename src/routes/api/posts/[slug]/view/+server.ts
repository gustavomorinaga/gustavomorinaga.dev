import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { ICMSData, IPostView } from '$lib/ts';

export const PUT = async ({ fetch, request }) => {
	const { id } = await request.json();

	const { data } = await fetch(`${PUBLIC_CMS_URL}/api/post-views/${id}`).then<ICMSData<IPostView>>(
		res => res.json()
	);

	const response = await fetch(`${PUBLIC_CMS_URL}/api/post-views/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ data: { views: data?.views + 1 } })
	}).then<ICMSData<IPostView>>(res => res.json());

	return json(response);
};
