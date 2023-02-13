export interface ILang {
	code: string;

	header: {
		logo: {
			alt: string;
		};

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

	player: {
		show: string;

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

	scrollTop: string;

	footer: string;
}
