import type { IMedia, ITimestamps } from './cms';

export interface IPlaylistTrack extends ITimestamps {
	title: string;
	author: string;
	url: string;
	source: IMedia;
	cover: IMedia;
}
