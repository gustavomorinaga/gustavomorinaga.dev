import { PUBLIC_DOMAIN } from '$env/static/public';
import { dev } from '$app/environment';

export const baseURL = dev ? '' : PUBLIC_DOMAIN;

export const extractMainPath = (path: string, sticky: string[] = []) => {
	if (sticky.length && sticky.some(p => path.includes(p)))
		return path.split('/').slice(1).shift()?.replace('', '/');

	return path;
};
