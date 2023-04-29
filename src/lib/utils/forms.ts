/* eslint-disable @typescript-eslint/no-explicit-any */

export const getForm = <T extends Record<string, any>>(event: SubmitEvent): T =>
	Object.fromEntries(new FormData(event.target as HTMLFormElement)) as T;
