import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '$lib/lang';

const updateAria = (code: string) => browser && document.documentElement.setAttribute('lang', code);

export const initializeLang = () => {
	let defaultLang = pt;

	if (browser && navigator.language.startsWith('en')) defaultLang = en;

	const { subscribe, set } = writable(defaultLang);
	updateAria(defaultLang.code);

	return {
		subscribe,
		change: (lang: string) => {
			set(lang === 'pt' ? pt : en);
			updateAria(lang);
		}
	};
};

export const LANG = initializeLang();
