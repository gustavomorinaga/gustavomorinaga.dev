import { XMLBuilder } from 'fast-xml-parser';

const builder = new XMLBuilder({
	ignoreAttributes: false,
	format: true,
	cdataPropName: 'cdata'
});

export const load = async () => {
	return {};
};
