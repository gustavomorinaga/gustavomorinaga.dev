import { get, writable } from 'svelte/store';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';

interface IAchievement {
	_id: string;
	xp: number;
}

type TAchievement = typeof ACHIEVEMENTS_DICTIONARY;

const ACHIEVEMENTS_DICTIONARY = {
	GMD_404: {
		_id: 'GMD_404',
		xp: 100
	},
	GMD_LOGO: {
		_id: 'GMD_LOGO',
		xp: 50
	},
	GMD_SOCIAL: {
		_id: 'GMD_SOCIAL',
		xp: 150
	},
	GMD_PROJECT: {
		_id: 'GMD_PROJECT',
		xp: 100
	},
	GMD_SETUP: {
		_id: 'GMD_SETUP',
		xp: 50
	},
	GMD_SONG: {
		_id: 'GMD_SONG',
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
