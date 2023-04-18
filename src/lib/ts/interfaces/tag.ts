import type { ITimestamps } from './cms';
import type { IIcon } from './icon';

export interface ITag extends ITimestamps, Omit<IIcon, 'color' | 'size'> {
	id: number;
	label: string;
	value: string;
}
