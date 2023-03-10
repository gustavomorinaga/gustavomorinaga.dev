import { sveltekit } from '@sveltejs/kit/vite';
import viteCompression from 'vite-plugin-compression';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), viteCompression({ algorithm: 'brotliCompress' })],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	build: {
		target: 'es2022'
	},
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
