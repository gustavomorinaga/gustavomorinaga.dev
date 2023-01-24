import { browser } from '$app/environment';

export const prefersReducedMotion = browser
	? window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
	: false;
