import { writable } from 'svelte/store';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import type { TierResult } from 'detect-gpu';

export interface IGraphicsState extends TierResult {
	isThree: boolean;
	isLowEnd: boolean;
	isMobile: boolean;
}

export const initializeGPU = () => {
	const { subscribe, set } = persist<IGraphicsState>(writable(), createLocalStorage(), 'gpu');

	// * tier: 1 (>= 15 fps), tier: 2 (>= 30 fps) or tier: 3 (>= 60 fps)

	return {
		subscribe,
		change: (detectedGPU: TierResult) =>
			set({
				...detectedGPU,
				isThree: detectedGPU.tier > 2,
				isLowEnd: detectedGPU.tier <= 1,
				isMobile: detectedGPU.isMobile || false
			})
	};
};

export const GPU = initializeGPU();
