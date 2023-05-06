import { XMLBuilder } from 'fast-xml-parser';

export const xmlBuilder = new XMLBuilder({
	ignoreAttributes: false,
	format: true,
	cdataPropName: 'cdata'
});
