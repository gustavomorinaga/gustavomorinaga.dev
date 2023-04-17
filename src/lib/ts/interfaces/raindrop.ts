export interface IRaindrops {
	collectionId: string;
	count: number;
	items: IRaindrop[];
	result: boolean;
}

export interface IRaindrop {
	_id: number;
	collectionId: number;
	title: string;
	excerpt: string;
	note: string;
	domain: string;
	link: string;
	type: 'link' | 'article' | 'video' | 'image' | 'audio';
	tags: string[];
	cover: string;
	media: IRaindropMedia[];
	removed: boolean;
	created: Date;
	lastUpdate: Date;
	highlights: [];
	sort: number;
}

export interface IRaindropMedia {
	type: 'image' | 'video' | 'audio';
	link: string;
	screenshot: boolean;
}

export interface IRaindropTags {
	items: IRaindropTag[];
	result: boolean;
}

export interface IRaindropTag {
	_id: string;
	count: number;
}
