import type { ICMSData, IPlaylistTrack } from '$lib/ts';

export const prerender = true;
export const ssr = true;

export async function load({ fetch, url: { pathname } }) {
	const playlist = await fetch('/api/playlist')
		.then<ICMSData<IPlaylistTrack[]>>(res => res.json())
		.catch(error => {
			console.error(error);

			return null;
		});

	return { pathname, playlist };
}
