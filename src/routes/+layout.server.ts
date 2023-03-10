import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPlaylist } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const [playlist] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/playlist-tracks?populate=*`).then<ICMSData<IPlaylist>>(res =>
			res.json()
		)
	]);

	return { pathname: url.pathname, playlist };
}) satisfies LayoutServerLoad;
