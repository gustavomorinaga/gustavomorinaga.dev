import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

interface INavigator extends Navigator {
	connection: {
		effectiveType: string;
	};
}

interface IAnalyticsOptions {
	path: string;
	params: Record<string, string>;
	analyticsId: string;
	debug?: boolean;
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

const getConnectionSpeed = () => {
	const nav = navigator as INavigator;

	return 'connection' in nav && nav['connection'] && 'effectiveType' in nav['connection']
		? nav['connection']['effectiveType']
		: '';
};

const sendToAnalytics = (metric: Metric, options: IAnalyticsOptions) => {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));

	const blob = new Blob([new URLSearchParams(body).toString()], {
		type: 'application/x-www-form-urlencoded'
	});

	if (navigator.sendBeacon) navigator.sendBeacon(vitalsUrl, blob);
	else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		});
};

/** @deprecated <https://vercel.com/docs/speed-insights/migrating-from-legacy> */
export const webVitals = (options: IAnalyticsOptions) => {
	try {
		onFID(metric => sendToAnalytics(metric, options));
		onTTFB(metric => sendToAnalytics(metric, options));
		onLCP(metric => sendToAnalytics(metric, options));
		onCLS(metric => sendToAnalytics(metric, options));
		onFCP(metric => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Analytics]', err);
	}
};
