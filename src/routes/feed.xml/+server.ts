import { PUBLIC_DOMAIN } from '$env/static/public';
import { xmlBuilder } from '$lib/utils';
import type { ICMSData, IPost } from '$lib/ts';

export const prerender = false;
export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour
	}
};

export const GET = async ({ fetch }) => {
	const posts = await fetch('/api/posts').then<ICMSData<IPost[]>>(res => res.json());

	const item = posts.data.map(post => ({
		guid: `${PUBLIC_DOMAIN}/blog/${post.slug}`,
		link: `${PUBLIC_DOMAIN}/blog/${post.slug}`,
		title: post.title,
		description: {
			cdata: `<img src="${post.cover.url}" /> ${post?.description}`
		},
		author: 'me@gustavomorinaga.dev (Gustavo Morinaga)',
		pubDate: new Date(post.publishedAt).toUTCString(),
		...(post.tags.length && {
			category: post.tags.map(tag => ({
				'@_domain': `${PUBLIC_DOMAIN}/blog/tags/${tag.value}`,
				cdata: tag.label
			}))
		})
	}));

	const feed = {
		rss: {
			'@_xmlns:atom': 'https://www.w3.org/2005/Atom',
			'@_version': '2.0',
			channel: {
				'atom:link': {
					'@_href': `${PUBLIC_DOMAIN}/feed.xml`,
					'@_rel': 'self',
					'@_type': 'application/rss+xml'
				},
				title: 'Gustavo Morinaga',
				link: PUBLIC_DOMAIN,
				description:
					'Here you will find articles that I wrote about technology, programming, design and much more.',
				copyright: 'MIT License',
				language: 'en',
				lastBuildDate: new Date().toUTCString(),
				item
			}
		}
	};

	const xml = xmlBuilder.build(feed);

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': `public, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=${config.isr.expiration}`
		}
	});
};
