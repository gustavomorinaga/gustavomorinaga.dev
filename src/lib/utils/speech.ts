import { browser } from '$app/environment';

export const getVoice = (lang = 'en-US') =>
	speechSynthesis.getVoices().filter(voice => voice.lang === lang);

export const speakText = (text: string, lang = 'en-US') => {
	if (!browser) return;

	speechSynthesis.cancel();

	const utterance = new SpeechSynthesisUtterance(text);

	const [voice] = getVoice(lang);

	utterance.lang = lang;
	utterance.voice = voice;

	speechSynthesis.speak(utterance);

	return speechSynthesis;
};
