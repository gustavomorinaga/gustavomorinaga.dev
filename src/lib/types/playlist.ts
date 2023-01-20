import type { IMedia, ITimestamps } from '$lib/types/cms';

export interface IPlaylist extends ITimestamps {
	title: string;
	author: string;
	url: string;
	source: IMedia;
	cover: IMedia;
}
