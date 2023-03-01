import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: seqPreprocessor([
		vitePreprocess(),
		preprocess({
			postcss: true,
			scss: true,
			typescript: true
		}),
		preprocessThrelte()
	]),

	kit: {
		adapter: adapter({ runtime: 'edge', split: true })
	}
};

export default config;
