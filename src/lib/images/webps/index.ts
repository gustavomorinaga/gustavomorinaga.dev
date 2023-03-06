export const IMAGES_WEBP = {
	avatar: await import('./avatar.webp').then(i => i.default),
	displacement: await import('./displacement.webp').then(i => i.default),
	grid: await import('./grid.webp').then(i => i.default),
	metalness: await import('./metalness.webp').then(i => i.default),
	noise: await import('./noise.webp').then(i => i.default),
	preview: await import('./preview.webp').then(i => i.default),
	profileCropped: await import('./profile-cropped.webp').then(i => i.default),
	profile: await import('./profile.webp').then(i => i.default),
	universe: await import('./universe.webp').then(i => i.default)
};
