import { browser } from '$app/environment';
import { prefersReducedMotion } from './reduced-motion';

export const observeScroll = (
	options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 1 }
) => {
	if (!browser || prefersReducedMotion) return { observer: null };

	const observedElements = document.querySelectorAll('.observe__scroll');

	const observer = new IntersectionObserver(entries => {
		for (const entry of entries)
			if (entry.isIntersecting) entry.target.classList.add('observe__show');
			else entry.target.classList.remove('observe__show');
	}, options);

	for (const element of observedElements) observer.observe(element);

	return { observer };
};
