import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';

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

export const scrollIntoView = (event: Event) => {
	if (!browser) return;

	const target = event.currentTarget as HTMLAnchorElement;
	const anchor = target.getAttribute('href');
	if (!anchor) return;

	const element = document.querySelector(anchor);
	if (!element) return;

	element.scrollIntoView({ ...(!prefersReducedMotion && { behavior: 'smooth' }) });
};

export const scrollToTop = () => {
	if (!browser || prefersReducedMotion) return;

	const body = document.body || document.documentElement;

	body.scrollIntoView({ ...(!prefersReducedMotion && { behavior: 'smooth' }) });
};
