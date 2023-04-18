import type { ILang } from '$lib/ts';

interface IDateFormatter {
	lang: ILang['code'];
	date: Date;
}

export const dateFormatter = ({ lang, date }: IDateFormatter) =>
	new Intl.DateTimeFormat(lang, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timeZone: 'UTC'
	}).format(date);

export const simpleDateFormatter = ({ lang, date }: IDateFormatter) =>
	new Intl.DateTimeFormat(lang, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	}).format(date);

export const durationFormatter = ({ lang, date }: IDateFormatter) =>
	new Intl.DateTimeFormat(lang, {
		minute: '2-digit',
		second: '2-digit'
	}).format(date);
