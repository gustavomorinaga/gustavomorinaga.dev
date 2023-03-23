export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timeZone: 'UTC'
});

export const durationFormatter = new Intl.DateTimeFormat('pt-BR', {
	minute: '2-digit',
	second: '2-digit'
});
