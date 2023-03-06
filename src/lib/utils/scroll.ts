import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';
import anime from 'animejs';
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

export const scrollIntoView = (event: Event) => {
	if (!browser) return;

	const target = event.currentTarget as HTMLAnchorElement;
	const anchor = target.getAttribute('href');
	if (!anchor) return;

	const element = document.querySelector(anchor) as HTMLElement;
	if (!element) return;

	const header = document.querySelector('#header') as HTMLElement;

	return anime({
		targets: containerElement,
		scrollTop: element.offsetTop + (header.offsetHeight || 0),
		duration: prefersReducedMotion ? 500 : 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart'
	});
};

export const scrollToTop = () => {
	if (!browser) return;

	return anime({
		targets: containerElement,
		scrollTop: 0,
		duration: prefersReducedMotion ? 500 : 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart'
	});
};
