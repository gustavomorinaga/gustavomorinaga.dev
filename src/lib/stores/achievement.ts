import { get, writable } from 'svelte/store';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';

interface IAchievement {
	title: string;
	description: string;
	xp: number;
}

type TAchievement = typeof ACHIEVEMENTS_DICTIONARY;

const ACHIEVEMENTS_DICTIONARY = {
	GMD_404: {
		title: 'Challenging The Unknown',
		description: 'Enter on a nonexistent page',
		xp: 100
	},
	GMD_LOGO: {
		title: 'Master Clicker',
		description: 'Click the logo 5 times',
		xp: 50
	},
	GMD_PROJECT: {
		title: 'Project Explorer',
		description: "Visit or view a project's code",
		xp: 50
	},
	GMD_SETUP: {
		title: 'Holy Shrine',
		description: 'Click on a setup component',
		xp: 50
	},
	GMD_SONG: {
		title: 'Drop The Beat',
		description: 'Listen to 3 songs in a row',
		xp: 50
	}
} satisfies { [k: string]: IAchievement };

const DURATION = 5000;

export const initAchievement = () => {
	const MAP = persist<{ [k: string]: boolean }>(
		writable({}),
		createLocalStorage(true),
		'achievements'
	);

	const NOTIFIER = writable<IAchievement[]>([]);

	return {
		subscribe: NOTIFIER.subscribe,
		unlocked: (key: keyof TAchievement) => get(MAP)[key],
		unlock: (key: keyof TAchievement, duration = DURATION) => {
			if (get(MAP)[key]) return;

			MAP.update(state => ({ ...state, [key]: true }));

			NOTIFIER.update(state => [ACHIEVEMENTS_DICTIONARY[key], ...state]);
			setTimeout(() => NOTIFIER.update(state => [...state.slice(0, -1)]), duration);
		}
	};
};

export const ACHIEVEMENTS = initAchievement();
