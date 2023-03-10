import { writable } from 'svelte/store';
import { createSessionStorage, persist } from '@macfja/svelte-persistent-store';
import type { TierResult } from 'detect-gpu';

export interface IGraphicsState extends Partial<TierResult> {
	isThree: boolean;
	isLowEnd: boolean;
	isMobile: boolean;
}

const INITIAL_STATE: IGraphicsState = { isThree: false, isLowEnd: false, isMobile: false };

export const initializeGPU = () => {
	const { subscribe, set } = persist<IGraphicsState>(
		writable(INITIAL_STATE),
		createSessionStorage(),
		'gpu'
	);

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
