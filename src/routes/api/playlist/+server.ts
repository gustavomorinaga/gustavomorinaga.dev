import { PUBLIC_CMS_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import qs from 'qs';
import type { ICMSData, IPlaylistTrack } from '$lib/ts';

export const GET = async ({ fetch }) => {
	const query = {
		playlist: {
			populate: '*'
		}
	};

	const [playlist] = await Promise.all([
		fetch(
			`${PUBLIC_CMS_URL}/api/playlist-tracks?${qs.stringify(query.playlist, {
				encodeValuesOnly: true
			})}}`
		)
			.then<ICMSData<IPlaylistTrack[]>>(res => res.json())
			.catch(error => {
				console.error(error);

				return null;
			})
	]);

	return json(playlist);
};
