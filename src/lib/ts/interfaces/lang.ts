export interface ILang {
	code: 'en' | 'pt';

	metadata: {
		title: string;
		description: string;
	};

	resume: {
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
		bookmarks: string;
		feed: string;
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

	blog: {
		title: string;
		paragraph: string;

		metadata: {
			title: string;
			description: string;
		};

		placeholder: string;
		filters: {
			[key: string]: string;
		};

		latest: string;
		empty: string;
		loadMore: string;
	};

	post: {
		goBack: string;

		read: string;

		toc: string;
		options: {
			share: string;
			newsletter: string;
			comments: string;
		};
		related: string;

		newsletter: {
			title: string;
			paragraph: string;

			form: {
				placeholder: string;
				subscribe: string;
				loading: string;
				success: {
					title: string;
					paragraph: string;
				};
				error: {
					title: string;
					paragraph: string;
				};
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

		gesture: string;

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

	bookmarks: {
		title: string;
		paragraph: string;

		metadata: {
			title: string;
			description: string;
		};

		filters: {
			[key: string]: string;
		};

		help: string;
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

	achievements: {
		[key: string]: {
			title: string;
			description: string;
		};
	};
}
