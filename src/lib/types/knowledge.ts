import type { IIcon } from './icon';

interface ITech extends IIcon {
	title: string;
	url: string;
}

export interface IKnowledge {
	techs: ITech[];
	tools: ITech[];
}
