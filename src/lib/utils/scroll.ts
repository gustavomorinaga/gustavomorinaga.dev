import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';
import anime, { type AnimeParams } from 'animejs';
import type { IntersectDetail } from '@svelte-put/intersect';

export const containerElement = browser
	? window.document.scrollingElement || document.body || document.documentElement
	: undefined;

export const animateOnScroll = (e: CustomEvent<IntersectDetail>) => {
	const {
		entries: [{ target, isIntersecting }]
	} = e.detail;

	if (prefersReducedMotion) return;

	!target.classList.contains('observe__scroll') && target.classList.add('observe__scroll');
	target.classList.toggle('observe--show', isIntersecting);
};

export const scrollIntoView = (event: Event | string) => {
	if (!browser) return;

	let anchor = null;
	if (event instanceof Event) {
		const target = event.currentTarget as HTMLAnchorElement;
		anchor = target.getAttribute('href');
	}

	if (typeof event === 'string') anchor = encodeURI(event);

	if (!anchor) return;

	const element = document.querySelector(anchor) as HTMLElement;
	if (!element) return;

	const header = document.querySelector('#header') as HTMLElement;

	return anime({
		targets: containerElement,
		duration: prefersReducedMotion ? 500 : 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart',
		scrollTop: element.offsetTop + (header?.offsetHeight || 0)
	});
};

export const scrollToTop = (event?: (Event & { static?: boolean }) | { static?: boolean }) => {
	if (!browser) return;

	let animeParams: AnimeParams = {
		targets: containerElement,
		scrollTop: 0,
		duration: prefersReducedMotion ? 500 : 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart'
	};
	if (event && event.static) animeParams = { ...animeParams, duration: 0, easing: 'linear' };

	return anime(animeParams);
};
