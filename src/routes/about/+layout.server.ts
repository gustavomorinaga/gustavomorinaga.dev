export const load = async ({ parent }) => {
	const { pathname } = await parent();

	return { pathname };
};
