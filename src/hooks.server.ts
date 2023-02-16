import { building } from '$app/environment';
import { minify } from 'html-minifier';
import type { Handle } from '@sveltejs/kit';
import type { Options } from 'html-minifier';

const minificationOptions = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: false,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
	collapseInlineTagWhitespace: true
} satisfies Options;

export const handle = (async ({ resolve, event }) => {
	let page = '';

	const response = await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;

			if (done) return building ? minify(page, minificationOptions) : page;
		}
	});

	response.headers.set('Accept-Encoding', 'br, gzip, deflate');

	return response;
}) satisfies Handle;
