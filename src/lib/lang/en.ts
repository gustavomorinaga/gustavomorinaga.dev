import type { ILang } from '$lib/types';

const year = new Date().getFullYear();

export const en: ILang = {
	code: 'en',

	metadata: {
		title: 'Gustavo Morinaga Developer',
		description:
			'Creative full-stack developer passionate about creating complete, efficient and hi-tech solutions.'
	},

	curriculum: {
		title: 'Download curriculum'
	},

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
			paragraph: 'Multiple technologies, multiple possibilities to solve multiple problems...',
			moreDetails: 'More details'
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

	about: {
		title: 'About me',
		paragraph:
			"<p>You can call me Gu or Morinaga, I'm a full-stack developer with a focus on front-end. <br /> Since childhood I had a lot of skill and interest in computers, but I never thought about the possibility of working in the area because I loved drawing. When I as 17, I had my first contact with programming at <a href='https://www.cps.sp.gov.br/etecs/etec-de-sao-roque' target='_blank' rel='noopener noreferrer'>Etec de São Roque</a> while doing the course of Informatics. But the <a href='https://summit.microsoft.com' target='_blank' rel='noopener noreferrer'>MVP Conf</a>, that I attended in 2018, that inspired me to pursue this career in technology. Since then I dedicated to become a good developer, starting with JavaScript and Node.js. <br /> I always take programming as fun, I  really value a great DX (developer experience), I'm very curious to learn about new concepts and technologies (no wonder I have a huge collection of them) and I like to teach/help other developers. I'm attentive to details and I don't stop until the problem is solved. <br /> Do you have a question or want to talk? Call me on one of my contacts, I'll be happy to help!</p>",

		metadata: {
			title: 'About me',
			description:
				'Here I briefly tell my journey as a full-stack developer and some fun facts about myself.'
		},

		details: {
			title: 'Details',
			age: 'years old',
			occupation:
				'Full-Stack Developer at <a href="https://advtecnologia.com.br" target="_blank" rel="noopener noreferrer"> @ADV Tecnologia </a>',
			home: 'Live in São Roque, SP, Brasil',
			homeland: 'From Isesaki, Gunma, Japão'
		},
		facts: {
			title: 'Random Facts',
			character: 'My favorite character is Spider-Man.',
			entertainment: "I'm passionate about games.",
			movie: 'I watch action and sci-fi movies/animations.',
			hobby: 'I like to play electric guitar at spare time.',
			music: 'I love to listen metal, synthwave and old ones.'
		},

		actions: {
			knowledge: 'Knowledge',
			setup: 'Setup',
			about: 'About me'
		},

		knowledge: {
			title: 'Knowledge',

			metadata: {
				title: 'Knowledge',
				description:
					'Here I highlight the technologies and tools that I have knowledge and practice in developing my work.'
			},

			languages: 'Languages',
			runtime: 'Runtime',
			libs: 'Libs',
			frameworks: 'Frameworks',
			databases: 'Databases',
			versionControl: 'Version control',
			packageManagers: 'Package managers',
			platforms: 'Platforms',
			plugins: 'Plugins',
			bundlers: 'Bundlers',
			compilers: 'Compilers',
			tools: 'Tools'
		},

		setup: {
			title: 'Setup',

			metadata: {
				title: 'Setup',
				description: 'Here I show the equipment I currently have for work and study.'
			},

			motherboard: 'Motherboard',
			cpu: 'CPU',
			ram: 'RAM',
			gpu: 'GPU',
			ssd: 'SSD',
			hdd: 'HDD',
			cooler: 'Cooler',
			powerSupply: 'Power supply',
			pcTower: 'PC tower',
			monitor: 'Monitor',
			keyboard: 'Keyboard',
			mouse: 'Mouse',
			audioInterface: 'Audio interface',
			headset: 'Headset',
			microphone: 'Microphone'
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
