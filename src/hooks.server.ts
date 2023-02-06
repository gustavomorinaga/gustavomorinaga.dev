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

	const acceptEncoding = event.request.headers.get('Accept-Encoding');

	if (acceptEncoding?.includes('br')) response.headers.set('Content-Encoding', 'br');
	else if (acceptEncoding?.includes('gzip')) response.headers.set('Content-Encoding', 'gzip');
	else if (acceptEncoding?.includes('deflate')) response.headers.set('Content-Encoding', 'deflate');

	return response;
}) satisfies Handle;
