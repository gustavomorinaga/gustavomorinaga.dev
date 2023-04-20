import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPlaylist } from '$lib/ts';

export async function load({ fetch, url: { pathname } }) {
	const [playlist] = await Promise.all([
		fetch(`${PUBLIC_CMS_URL}/api/playlist-tracks?populate=*`)
			.then<ICMSData<IPlaylist>>(res => res.json())
			.catch(error => {
				console.error(error);

				return null;
			})
	]);

	return { pathname, playlist };
}

export const prerender = true;
export const ssr = true;
