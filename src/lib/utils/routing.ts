import { PUBLIC_DOMAIN } from '$env/static/public';
import { dev } from '$app/environment';

export const baseURL = dev ? '' : PUBLIC_DOMAIN;

export const stickyRoutes = ['/about', '/blog/tags'];

interface IExtractMainPath {
	path: string;
	force?: boolean;
}

export const extractMainPath = ({ path, force = false }: IExtractMainPath) => {
	if (force || (stickyRoutes.length && stickyRoutes.some(p => path.includes(p))))
		return path.split('/').slice(1).shift()?.replace('', '/') || '';

	return path;
};
