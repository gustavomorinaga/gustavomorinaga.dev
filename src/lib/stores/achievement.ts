import { get, writable } from 'svelte/store';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';

interface IAchievement {
	title: string;
	description: string;
	xp: number;
}

type TAchievement = typeof ACHIEVEMENTS_DICTIONARY;

const ACHIEVEMENTS_DICTIONARY = {
	GMD_LOGO: {
		title: 'Master Clicker',
		description: 'Clicked the logo 5 times',
		xp: 50
	},
	GMD_404: {
		title: 'NOT FOUND!',
		description: 'Enter on a inexistent page',
		xp: 100
	}
} satisfies { [k: string]: IAchievement };

const DURATION = 5000;

export const initAchievement = () => {
	const MAP = persist<{ [k: string]: boolean }>(
		writable({}),
		createLocalStorage(true),
		'achievements'
	);

	const { subscribe, update } = writable<IAchievement[]>([]);

	return {
		subscribe,
		unlock: (key: keyof TAchievement, duration = DURATION) => {
			if (get(MAP)[key]) return;

			MAP.update(state => ({ ...state, [key]: true }));

			update(state => [ACHIEVEMENTS_DICTIONARY[key], ...state]);
			setTimeout(() => update(state => [...state.slice(0, -1)]), duration);
		}
	};
};

export const ACHIEVEMENTS = initAchievement();
