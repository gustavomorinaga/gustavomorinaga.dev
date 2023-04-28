import type { ILang } from '$lib/ts';

interface IDateFormatter {
	lang: ILang['code'];
	date: Date;
	dateStyle: Intl.DateTimeFormatOptions['dateStyle'];
}

export const dateFormatter = ({ lang, date, dateStyle }: IDateFormatter) =>
	new Intl.DateTimeFormat(lang, {
		dateStyle,
		timeZone: 'UTC'
	}).format(date);

export const durationFormatter = ({ lang, date }: Omit<IDateFormatter, 'dateStyle'>) =>
	new Intl.DateTimeFormat(lang, {
		minute: '2-digit',
		second: '2-digit'
	}).format(date);
