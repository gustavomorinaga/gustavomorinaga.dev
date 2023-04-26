import type { ILocalizations, IMedia, ITimestamps } from './cms';
import type { ITag } from './tag';

export interface IPost extends ILocalizations, ITimestamps {
	id: number;
	title: string;
	slug: string;
	content: string;
	description: string;
	subtitle: string;
	tags: ITag[];
	locale: string;
	cover: IMedia;
	postViews?: IPostView[];
	readingTime: number;
}

export interface IPostView extends ITimestamps {
	id: number;
	views: number;
}
