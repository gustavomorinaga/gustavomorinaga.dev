export interface ILang {
	code: string;

	metadata: {
		title: string;
		description: string;
	};

	curriculum: {
		title: string;
	};

	header: {
		logo: {
			alt: string;
		};

		home: string;
		blog: string;
		about: string;
		projects: string;
		bookmark: string;
		lang: string;
	};

	home: {
		blurb: {
			title: string;
			paragraph: string;

			skillDev: string;
			skillDesign: string;
			skillExp: string;
		};

		about: {
			title: string;
			subtitle: string;
			paragraph: string;
			quote: string;
			moreDetails: string;
		};

		knowledge: {
			title: string;
			paragraph: string;
			moreDetails: string;
		};

		services: {
			title: string;

			cardDesign: {
				title: string;
				paragraph: string;
				alt: string;
			};
			cardDev: {
				title: string;
				paragraph: string;
				alt: string;
			};
			cardSeo: {
				title: string;
				paragraph: string;
				alt: string;
			};
			cardMotion: {
				title: string;
				paragraph: string;
				alt: string;
			};
		};
	};

	about: {
		title: string;
		paragraph: string;

		metadata: {
			title: string;
			description: string;
		};

		details: {
			title: string;
			age: string;
			occupation: string;
			home: string;
			homeland: string;
		};

		facts: {
			title: string;
			character: string;
			entertainment: string;
			movie: string;
			hobby: string;
			music: string;
		};

		actions: {
			knowledge: string;
			setup: string;
			about: string;
		};

		knowledge: {
			title: string;

			metadata: {
				title: string;
				description: string;
			};

			languages: string;
			runtime: string;
			libs: string;
			frameworks: string;
			databases: string;
			versionControl: string;
			packageManagers: string;
			platforms: string;
			plugins: string;
			bundlers: string;
			compilers: string;
			tools: string;
		};

		setup: {
			title: string;

			metadata: {
				title: string;
				description: string;
			};

			link: string;

			motherboard: string;
			cpu: string;
			ram: string;
			gpu: string;
			ssd: string;
			hdd: string;
			cooler: string;
			powerSupply: string;
			pcTower: string;
			monitor: string;
			keyboard: string;
			mouse: string;
			audioInterface: string;
			headset: string;
			microphone: string;
		};
	};

	projects: {
		title: string;
		paragraph: string;

		metadata: {
			title: string;
			description: string;
		};

		links: {
			deploy: string;
			code: string;
		};

		portfolio: {
			description: string;
		};
		'next-plate': {
			description: string;
		};
		'github-unfollow-checker': {
			description: string;
		};
		hotcode: {
			description: string;
		};
	};

	player: {
		show: string;

		link: string;

		shuffle: string;
		prev: string;
		play: string;
		pause: string;
		next: string;
		repeat: string;

		volume: string;
		playlist: string;
		hide: string;
	};

	error: {
		title: string;
		paragraph: string;

		return: string;
	};

	scrollTop: string;

	footer: string;

	cookieConsent: {
		title: string;
		paragraph: string;
		confirm: string;
	};
}
