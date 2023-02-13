import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '$lib/lang';

const updateAria = (code: string) => browser && document.documentElement.setAttribute('lang', code);

export const initializeLang = () => {
	let defaultLang = en;

	if (browser && navigator.language.startsWith('pt')) defaultLang = pt;

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
