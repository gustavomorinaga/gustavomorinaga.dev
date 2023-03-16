import { writable } from 'svelte/store';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';

export interface ICookieConsent {
	accepted: boolean;
}

const INITIAL_STATE = {
	accepted: false
};

export const COOKIE_CONSENT = persist<ICookieConsent>(
	writable(INITIAL_STATE),
	createLocalStorage(true),
	'cookie-consent'
);
