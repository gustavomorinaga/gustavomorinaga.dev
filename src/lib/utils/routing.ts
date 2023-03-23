import { PUBLIC_DOMAIN } from '$env/static/public';
import { dev } from '$app/environment';

export const baseURL = dev ? '' : PUBLIC_DOMAIN;

export const extractMainPath = (path: string) => path.split('/').slice(1).shift()?.replace('', '/');
