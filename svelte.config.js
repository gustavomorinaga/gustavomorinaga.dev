import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';
import { mdsvex } from 'mdsvex';

// Configs
import mdsvexConfig from './mdsvex.config.mjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: seqPreprocessor([
		vitePreprocess(),
		preprocess(),
		preprocessThrelte(),
		mdsvex(mdsvexConfig)
	]),
	extensions: ['.svelte'],

	kit: {
		adapter: adapter()
	}
};

export default config;
