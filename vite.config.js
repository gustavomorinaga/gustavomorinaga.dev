import { sveltekit } from '@sveltejs/kit/vite';
import viteCompression from 'vite-plugin-compression';
import browserslistToEsbuild from 'browserslist-to-esbuild';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), viteCompression({ algorithm: 'brotliCompress' })],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	build: {
		target: browserslistToEsbuild()
	},
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
