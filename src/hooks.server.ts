import { building } from '$app/environment';
import { minify, type Options } from 'html-minifier';

const MINIFICATION_CONFIG = {
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

const PRELOAD = ['font', 'css', 'js', 'asset'];

export const handle = async ({ resolve, event }) => {
	let page = '';

	return await resolve(event, {
		preload: ({ type }) => PRELOAD.includes(type),
		transformPageChunk: ({ html, done }) => {
			page += html;

			if (done) return building ? minify(page, MINIFICATION_CONFIG) : page;
		}
	});
};
