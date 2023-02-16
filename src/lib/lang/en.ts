import type { ILang } from '$lib/types';

const year = new Date().getFullYear();

export const en: ILang = {
	code: 'en',

	header: {
		logo: {
			alt: 'Home'
		},

		home: 'Home',
		blog: 'Blog',
		about: 'About me',
		projects: 'Projects',
		bookmark: 'Bookmarks',
		lang: 'Change language'
	},

	home: {
		blurb: {
			title: "Greetings! I'm",
			paragraph:
				'Creative full-stack developer passionate about creating complete, efficient and hi-tech solutions.',
			skillDev: 'Full-Stack Dev',
			skillDesign: 'UI/UX Designer',
			skillExp: '+2 years of experience'
		},

		about: {
			title: 'About me',
			subtitle: 'Full-Stack Developer & UI/UX Designer',
			paragraph:
				"My name is Gustavo Morinaga, I'm 22 years old, I'm a Full-Stack developer and UI/UX Designer. I develop websites and complete applications with the best technologies available in the market. I'm always in constant learning and aiming to deliver the best experience and performance possible.",
			quote: "It's not the programming language that defines the programmer, but his logic.",
			moreDetails: 'More details'
		},

		knowledge: {
			title: 'Knowledge',
			paragraph: 'Multiple technologies, multiple possibilities to solve multiple problems...'
		},

		services: {
			title: 'Services',

			cardDesign: {
				title: 'UI/UX Design',
				paragraph:
					'I sketch intuitive, objective and clear interfaces. User experience first, always.',
				alt: 'Icon by icon king1 on freeicons.io'
			},
			cardDev: {
				title: 'Development',
				paragraph:
					'I develop professional websites, apps, blogs, portfolios, landing pages, e-commerce and APIs.',
				alt: 'Icon by Fandi Kurniawan on freeicons.io'
			},
			cardSeo: {
				title: 'SEO',
				paragraph:
					'I improve the way your site is easily found and disseminated over the internet.',
				alt: 'Icon by Fandi Kurniawan on freeicons.io'
			},
			cardMotion: {
				title: 'Animation',
				paragraph:
					'I create smooth, fluid and attractive interactions for the user. Without disturbing navigation.',
				alt: 'Icon by Vanda Arief on freeicons.io'
			}
		}
	},

	player: {
		show: 'Show player',

		shuffle: 'Shuffle',
		prev: 'Previous',
		play: 'Play',
		pause: 'Pause',
		next: 'Next',
		repeat: 'Repeat',

		volume: 'Volume',
		playlist: 'Open playlist',
		hide: 'Hide player'
	},

	scrollTop: 'Scroll to top',

	footer: `Developed with ❤ by Gustavo Morinaga © ${year}`
};
