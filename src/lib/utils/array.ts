/* eslint-disable @typescript-eslint/no-explicit-any */

export const sortBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], k: K): T[] =>
	arr?.length ? arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)) : [];

export const reduceBy = <T extends Record<string, any>, K extends keyof T>(
	arr: T[],
	k: K
): number => (arr?.length ? arr.concat().reduce((acc, curr) => acc + curr[k], 0) : 0);
