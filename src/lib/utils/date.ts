export const getMinDiff = (startDate: Date, endDate = new Date()) => {
	const msInMinute = 60 * 1000;

	return Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInMinute);
};
