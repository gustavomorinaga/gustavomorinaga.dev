import type { IKnowledge } from './knowledge';
import type { IService } from './service';
import type { ISocial } from './social';

export interface IProfile {
	social: ISocial[];
	knowledge: IKnowledge;
	services: IService[];
}
