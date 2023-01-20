import { PUBLIC_CMS_URL } from '$env/static/public';
import type { ICMSData, IPlaylist } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const playlist: ICMSData<IPlaylist> = await fetch(
		`${PUBLIC_CMS_URL}/api/playlist-tracks?populate=*`
	).then(res => res.json());

	return { playlist };
}) satisfies LayoutServerLoad;
