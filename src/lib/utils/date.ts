export const getAge = (date: Date | string) =>
	Math.abs(new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970);

export const getMinDiff = (startDate: Date, endDate = new Date()) => {
	const msInMinute = 60 * 1000;

	return Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInMinute);
};
