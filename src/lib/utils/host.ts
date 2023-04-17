import { dev } from '$app/environment';
import { PUBLIC_CMS_URL } from '$env/static/public';

export const HOST = dev ? PUBLIC_CMS_URL : '';
