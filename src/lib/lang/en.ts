import type { ILang } from '$lib/ts';

const year = new Date().getFullYear();

export const en: ILang = {
	code: 'en',

	metadata: {
		title: 'Gustavo Morinaga Developer',
		description:
			'Creative full-stack developer passionate about creating complete, efficient and hi-tech solutions.'
	},

	resume: {
		title: 'Resume'
	},

	header: {
		logo: {
			alt: 'Home'
		},

		home: 'Home',
		blog: 'Blog',
		about: 'About me',
		projects: 'Projects',
		bookmarks: 'Bookmarks',
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

	blog: {
		title: 'Blog',
		paragraph:
			'Here you will find articles that I wrote about technology, programming, design and much more.',

		metadata: {
			title: 'Blog',
			description:
				'Here you will find articles that I wrote about technology, programming, design and much more.'
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
				'Full-Stack Developer at <a href="https://advtecnologia.com.br" target="_blank" rel="noopener noreferrer">@ADV Tecnologia</a>',
			home: 'Live in São Roque, SP, Brazil',
			homeland: 'From Isesaki, Gunma, Japan'
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

			link: 'Search',

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

	projects: {
		title: 'Projects',
		paragraph:
			'Some highlights of my open-source projects. See them all on <a href="https://github.com/gustavomorinaga?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>.',

		metadata: {
			title: 'Projects',
			description: 'Some highlights of my open-source projects.'
		},

		gesture: 'Drag to view',

		links: {
			deploy: 'Demo',
			code: 'Code'
		},

		portfolio: {
			description: 'My super portfolio built with SvelteKit and served on Vercel.'
		},
		'next-plate': {
			description: 'A super template for Next.js with a pack of incredible tools.'
		},
		'github-unfollow-checker': {
			description: "A simple tool to check the users that doesn't follow you back."
		},
		hotcode: {
			description: 'A hotsite to attract developers to learn programming.'
		}
	},

	bookmarks: {
		title: 'Bookmarks',
		paragraph: 'My list of useful and interesting bookmarks that I use constantly.',

		metadata: {
			title: 'Bookmarks',
			description: 'My list of useful and interesting bookmarks that I use constantly.'
		},

		filters: {
			all: 'All',
			design: 'Design',
			devtools: 'DevTools',
			tips: 'Tips'
		},

		help: 'Click to filter the bookmarks and make your life easier.'
	},

	player: {
		show: 'Show player',

		link: 'Open on SoundCloud',

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

	error: {
		title: 'Lost in the system?',
		paragraph: "This page wasn't found or doesn't exist.",

		return: 'Back to start'
	},

	scrollTop: 'Scroll to top',

	footer: `Developed with ❤ by Gustavo Morinaga © ${year}`,

	cookieConsent: {
		title: 'Cookies',
		paragraph:
			'This website uses cookies and similar technologies to improve your browsing experience.',
		confirm: 'Okay'
	},

	achievements: {
		GMD_404: {
			title: 'Challenging The Unknown',
			description: 'Enter on a nonexistent page'
		},
		GMD_LOGO: {
			title: 'Master Clicker',
			description: 'Click the logo 5 times'
		},
		GMD_SOCIAL: {
			title: 'Hello World!',
			description: 'Click on a social network to get in touch'
		},
		GMD_PROJECT: {
			title: 'Project Explorer',
			description: "Visit or view a project's code"
		},
		GMD_SETUP: {
			title: 'Holy Shrine',
			description: 'Click on a setup component'
		},
		GMD_SONG: {
			title: 'Drop The Beat!',
			description: 'Listen to 3 songs in a row'
		}
	}
};
