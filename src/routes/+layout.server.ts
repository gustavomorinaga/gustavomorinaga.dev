export const prerender = true;
export const ssr = true;

export async function load({ url: { pathname } }) {
	return { pathname };
}
