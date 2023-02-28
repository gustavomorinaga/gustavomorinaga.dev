import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';
import anime from 'animejs';

export const containerElement = browser
	? window.document.scrollingElement || document.body || document.documentElement
	: undefined;

export const observeScroll = (
	options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 1 }
) => {
	if (!browser) return { observer: null };

	const observedElements = document.querySelectorAll('.observe__scroll');

	const observer = new IntersectionObserver(entries => {
		for (const entry of entries)
			if (entry.target.getAttribute('data-repeat-animation'))
				entry.target.classList.toggle('observe--show', entry.isIntersecting);
			else entry.isIntersecting && entry.target.classList.add('observe--show');
	}, options);

	for (const element of observedElements) observer.observe(element);

	return { observer };
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
