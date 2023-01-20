import type { ILocalizations, IMedia } from './cms';

export interface IPost extends ILocalizations {
	title: string;
	slug: string;
	content: string;
	description: string;
	subtitle: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	locale: string;
	cover: IMedia;
}
