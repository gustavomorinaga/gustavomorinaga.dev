import { writable } from 'svelte/store';
import type { IIcon } from '$lib/ts/interfaces';

interface INotification extends IIcon {
	title: string;
	description: string;
}

export const INITIAL_STATE: INotification[] = [];

const DURATION = 5000;

export const initNotification = () => {
	const { subscribe, update } = writable<INotification[]>(INITIAL_STATE);

	return {
		subscribe,
		add: (notification: INotification, duration = DURATION) => {
			update(state => [notification, ...state]);
			setTimeout(() => update(state => [...state.slice(0, -1)]), duration);
		}
	};
};

export const NOTIFICATIONS = initNotification();
