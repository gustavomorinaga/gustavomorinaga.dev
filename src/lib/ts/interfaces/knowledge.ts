import type { IIcon } from './icon';

export interface ITech extends IIcon {
	title: string;
	url: string;
}

export interface IKnowledge {
	techs: ITech[];
	tools: ITech[];
}
