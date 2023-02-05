import { sveltekit } from '@sveltejs/kit/vite';
import viteCompression from 'vite-plugin-compression';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), viteCompression({ algorithm: 'brotliCompress' })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	}
};

export default config;
