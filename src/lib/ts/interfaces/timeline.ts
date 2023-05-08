import type { IIcon } from './icon';

export interface ITimelineEvent extends IIcon {
	title: string;
	description: string;
	date: string;
	origin?: {
		title: string;
		url: string;
	};
}
