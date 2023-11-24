import { redirect } from '@sveltejs/kit';

const discordProfileURL = 'https://discordapp.com/users/373397937155473408'; // My Discord profile URL

export const GET = async () => {
	throw redirect(302, discordProfileURL);
};
