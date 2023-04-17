export interface ITimestamps {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

export interface IMeta {
	pagination: IPagination;
}

export interface IPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface ILocalizations {
	localizations: string[];
}

export interface IMedia extends ITimestamps {
	name: string;
	alternativeText?: string;
	caption?: string;
	width: number;
	height: number;
	formats: {
		thumbnail: IFormat;
		medium?: IFormat;
		large?: IFormat;
		small?: IFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl?: string;
	provider: string;
	provider_metadata?: string;
}

export interface IFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path?: string;
	width: number;
	height: number;
	size: number;
	url: string;
}

export interface ICMSData<T = unknown> {
	data: T[];
	meta: IMeta;
}
