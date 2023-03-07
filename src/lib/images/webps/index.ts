export const IMAGES_WEBP = {
	avatar: await import('./avatar.webp').then(i => i.default),
	displacement: await import('./texture-displacement.webp').then(i => i.default),
	grid: await import('./texture-grid.webp').then(i => i.default),
	metalness: await import('./texture-metalness.webp').then(i => i.default),
	noise: await import('./texture-noise.webp').then(i => i.default),
	previewPortfolio: await import('./preview-portfolio.webp').then(i => i.default),
	previewNextPlate: await import('./preview-next-plate.webp').then(i => i.default),
	previewGithubUnfollowerChecker: await import('./preview-github-unfollower-checker.webp').then(
		i => i.default
	),
	previewHotCode: await import('./preview-hotcode.webp').then(i => i.default),
	profileCropped: await import('./profile-cropped.webp').then(i => i.default),
	profile: await import('./profile.webp').then(i => i.default),
	universe: await import('./bg-universe.webp').then(i => i.default)
};
