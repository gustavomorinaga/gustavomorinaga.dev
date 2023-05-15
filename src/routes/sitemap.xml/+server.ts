import { PUBLIC_DOMAIN } from '$env/static/public';
import { xmlBuilder } from '$lib/utils';
import type { ICMSData, IPost, ITag } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour
	}
};

export const GET = async ({ fetch }) => {
	const [posts, tags] = await Promise.all([
		fetch('/api/posts').then<ICMSData<IPost[]>>(res => res.json()),
		fetch('/api/tags').then<ICMSData<ITag[]>>(res => res.json())
	]);

	const mainPages = [
		'',
		'/about',
		'/about/knowledge',
		'/about/setup',
		'/about/timeline',
		'/blog',
		'/bookmarks',
		'/projects'
	].map(page => ({
		loc: `${PUBLIC_DOMAIN}${page}`,
		lastmod: new Date().toISOString()
	}));

	const tagsPages = tags.data.map(tag => ({
		loc: `${PUBLIC_DOMAIN}/blog/tag/${tag.value}`,
		lastmod: new Date(tag.updatedAt).toISOString()
	}));

	const postsPages = posts.data.map(post => ({
		loc: `${PUBLIC_DOMAIN}/blog/${post.slug}`,
		lastmod: new Date(post.updatedAt).toISOString()
	}));

	const sitemap = {
		urlset: {
			'@_xmlns': 'https://www.sitemaps.org/schemas/sitemap/0.9',
			'@_xmlns:xhtml': 'https://www.w3.org/1999/xhtml',
			'@_xmlns:mobile': 'https://www.google.com/schemas/sitemap-mobile/1.0',
			'@_xmlns:news': 'https://www.google.com/schemas/sitemap-news/0.9',
			'@_xmlns:image': 'https://www.google.com/schemas/sitemap-image/1.1',
			'@_xmlns:video': 'https://www.google.com/schemas/sitemap-video/1.1',
			url: [...mainPages, ...tagsPages, ...postsPages]
		}
	};

	const xml = xmlBuilder.build(sitemap);

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': `public, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=${config.isr.expiration}`
		}
	});
};
