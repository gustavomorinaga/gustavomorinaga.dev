import { EMAIL_API, EMAIL_API_TOKEN, EMAIL_GROUPS } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import { validate } from 'deep-email-validator';

const LANGUAGES = ['pt', 'en'];
const [ptGroup, enGroup] = EMAIL_GROUPS.split(',');

const LANGUAGE_GROUPS = new Map([
	['pt', ptGroup],
	['en', enGroup]
]);

const requestHistory = new Map<string, Date>();

const isRateLimited = (ip: string, coolDown = 5000) => {
	const lastRequest = requestHistory.get(ip);
	const now = new Date();

	if (!lastRequest || now.getTime() - lastRequest.getTime() > coolDown) {
		requestHistory.set(ip, now);
		return false;
	}

	return true;
};

const createSubscriber = async (email: string, groups: string[] = []) => {
	const response = await fetch(`${EMAIL_API}/subscribers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${EMAIL_API_TOKEN}`
		},
		body: JSON.stringify({
			email,
			groups
		})
	});

	const data = await response.json();
	if (!response.ok) throw error(response.status, data.message);

	return data.data;
};

export const POST = async ({ request, getClientAddress }) => {
	const body = await request.json();

	if (!body.email) throw error(400, 'Inform a valid email');
	if (!body.language) throw error(400, 'Inform newsletter language');
	if (!LANGUAGES.includes(body.language)) throw error(400, 'Inform a valid language');

	const ip = getClientAddress();
	if (isRateLimited(ip)) throw error(429);

	const emailValidation = await validate({
		email: body.email,
		validateTypo: false,
		validateSMTP: false
	});
	if (!emailValidation.valid) throw error(400, emailValidation.reason);

	const languageGroup = LANGUAGE_GROUPS.get(body.language);
	const groups = languageGroup ? [languageGroup] : [];

	const subscriber = await createSubscriber(body.email, groups);
	if (!subscriber) throw error(500, 'Cannot subscribe to newsletter');

	return json(null);
};
