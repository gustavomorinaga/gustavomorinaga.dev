import type { IIcon } from './icon';

export interface ISkill extends IIcon {
	title: string;
	url: string;
}

export interface IKnowledge {
	techs: ISkill[];
	tools: ISkill[];
}

export interface IKnowledgePayload {
	title: string;
	skills: ISkill[];
}
