import { join } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { partytownVite } from '@builder.io/partytown/utils';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		partytownVite({
			dest: join(process.cwd(), 'static', '~partytown')
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
