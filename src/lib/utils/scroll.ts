import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';
import anime from 'animejs';

export const containerElement = browser
	? window.document.scrollingElement || document.body || document.documentElement
	: undefined;

export const observeScroll = (
	options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 1 }
) => {
	if (!browser || prefersReducedMotion) return { observer: null };

	const observedElements = document.querySelectorAll('.observe__scroll');

	const observer = new IntersectionObserver(entries => {
		for (const entry of entries)
			if (entry.isIntersecting) entry.target.classList.add('observe--show');
			else entry.target.classList.remove('observe--show');
	}, options);

	for (const element of observedElements) observer.observe(element);

	return { observer };
};

export const scrollIntoView = async (event: Event) => {
	if (!browser) return;

	const target = event.currentTarget as HTMLAnchorElement;
	const anchor = target.getAttribute('href');
	if (!anchor) return;

	const element = document.querySelector(anchor) as HTMLElement;
	if (!element) return;

	const header = document.querySelector('#header') as HTMLElement;

	return await anime({
		targets: containerElement,
		scrollTop: element.offsetTop + (header.offsetHeight || 0),
		duration: 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart'
	}).finished;
};

export const scrollToTop = async () => {
	if (!browser) return;

	return await anime({
		targets: containerElement,
		scrollTop: 0,
		duration: 1000,
		easing: prefersReducedMotion ? 'linear' : 'easeOutQuart'
	}).finished;
};
