import { profileJSON } from '$lib/databases';
import { getAge } from '$lib/utils';
import type { ILang } from '$lib/ts';

const year = new Date().getFullYear();
const age = getAge(profileJSON.birthday);
const yearsOfExperience = year - 2021; // 2021 = year of first job

export const pt: ILang = {
	code: 'pt',

	metadata: {
		title: 'Gustavo Morinaga Developer',
		description:
			'Desenvolvedor full-stack criativo e apaixonado em criar soluções completas, eficientes e de alta tecnologia.'
	},

	resume: {
		title: 'Currículo'
	},

	header: {
		logo: {
			alt: 'Início'
		},

		home: 'Início',
		blog: 'Blog',
		about: 'Sobre mim',
		projects: 'Projetos',
		bookmarks: 'Marcadores',
		feed: 'Feed',
		lang: 'Trocar idioma'
	},

	home: {
		blurb: {
			title: 'Saudações! Eu sou',
			paragraph:
				'Desenvolvedor full-stack criativo e apaixonado em criar soluções completas, eficientes e de alta tecnologia.',
			skillDev: 'Dev Full-Stack',
			skillDesign: 'UI/UX Designer',
			skillExp: `+${yearsOfExperience} anos de experiência`
		},

		about: {
			title: 'Sobre mim',
			subtitle: 'Full-Stack Developer & UI/UX Designer',
			paragraph: `Meu nome é Gustavo Morinaga, tenho ${age} anos, sou desenvolvedor Full-Stack e UI/UX Designer. Desenvolvo sites e aplicações completas com as melhores tecnologias disponíveis no mercado. Sempre estou em constante aprendizado e com o objetivo de entregar a melhor experiência e performance possível.`,
			quote: 'Não é a linguagem de programação que define o programador, mas sim sua lógica.',
			moreDetails: 'Mais detalhes'
		},

		knowledge: {
			title: 'Conhecimentos',
			paragraph:
				'Múltiplas tecnologias, múltiplas possibilidades em solucionar múltiplos problemas...',
			moreDetails: 'Mais detalhes'
		},

		services: {
			title: 'Serviços',

			cardDesign: {
				title: 'UI/UX Design',
				paragraph:
					'Esboço interfaces intuitivas, objetivas e claras. Experiência de usuário em primeiro lugar, sempre.',
				alt: 'Ícone port icon king1 em freeicons.io'
			},
			cardDev: {
				title: 'Desenvolvimento',
				paragraph:
					'Desenvolvo sites profissionais, aplicativos, blogs, portfólios, landing pages, e-commerce e APIs.',
				alt: 'Ícone port Fandi Kurniawan em freeicons.io'
			},
			cardSeo: {
				title: 'SEO',
				paragraph:
					'Aprimoro a forma que seu site seja facilmente encontrado e divulgado pela internet.',
				alt: 'Ícone port Fandi Kurniawan em freeicons.io'
			},
			cardMotion: {
				title: 'Animação',
				paragraph:
					'Crio interações suaves, fluídas e atraentes para o usuário. Sem atrapalhar a navegação.',
				alt: 'Ícone port Vanda Arief em freeicons.io'
			}
		}
	},

	blog: {
		title: 'Blog',
		paragraph:
			'Aqui você encontra artigos que escrevi sobre tecnologia, programação, design e muito mais.',

		metadata: {
			title: 'Blog',
			description:
				'Aqui você encontra artigos que escrevi sobre tecnologia, programação, design e muito mais.'
		},

		placeholder: 'Pesquisar artigos...',
		filters: {
			all: 'Todos'
		},

		latest: 'Recentes',
		empty: 'Nenhum artigo encontrado.',
		loadMore: 'Carregar mais'
	},

	post: {
		goBack: 'Voltar',

		read: 'de leitura',
		views: 'visualizações',

		toc: 'Sumário',
		options: {
			share: 'Compartilhar',
			newsletter: 'Inscrever-se',
			comments: 'Comentários'
		},
		related: 'Artigos relacionados',

		newsletter: {
			title: 'Gostou do conteúdo?',
			paragraph:
				'Inscreva-se para receber notificações por e-mail quando tiver conteúdo novo. Sem compromisso, cancele a qualquer momento.',

			form: {
				placeholder: 'seu.email@exemplo.com',
				subscribe: 'Inscrever-se',
				loading: 'Enviando...',
				success: {
					title: 'Inscrição realizada com sucesso!',
					paragraph: 'Legal! Agora você receberá notificações sobre novos artigos.'
				},
				error: {
					title: 'Algo deu errado!',
					paragraph: 'Ocorreu um erro ao tentar inscrevê-lo. Por favor, tente novamente mais tarde.'
				}
			}
		}
	},

	about: {
		title: 'Sobre mim',
		paragraph:
			'<p>Pode me chamar de Gu ou Morinaga, sou desenvolvedor full-stack com foco em front-end. <br /> Desde a infância tive muita habilidade e interesse com computadores, mas nunca pensei na possibilidade de trabalhar na área pois gostava muito de desenhar. Meu primeiro contato com programação foi aos 17 anos no curso técnico de Informática na <a href="https://www.cps.sp.gov.br/etecs/etec-de-sao-roque" target="_blank" rel="noopener noreferrer">Etec de São Roque</a>, porém o que me inspirou em seguir essa carreira da tecnologia foi a conferência da <a href="https://summit.microsoft.com/pt-br" target="_blank" rel="noopener noreferrer">MVP Conf</a> que participei em 2018. Desde então gostei muito de lógica e me dediquei para virar um bom desenvolvedor, começando por JavaScript e Node.js. <br /> Levo a programação sempre na diversão, dou muito valor para um ótimo DX (experiência do desenvolvedor), sou muito curioso em conhecer novos conceitos e tecnologias (não é atoa que tenho uma baita coleção delas) e gosto de ensinar/ajudar outros desenvolvedores. Sou atencioso aos detalhes e não paro até que o problema seja resolvido. <br /> Tem alguma dúvida ou quer trocar uma ideia? Me chama em um dos meus contatos, ficarei feliz em ajudar!</p>',

		metadata: {
			title: 'Sobre mim',
			description:
				'Aqui conto brevemente a minha jornada de desenvolvedor full-stack e algumas curiosidades sobre mim.'
		},

		details: {
			title: 'Detalhes',
			age: 'anos',
			occupation:
				'Desenvolvedor Full-Stack na <a href="https://advtecnologia.com.br" target="_blank" rel="noopener noreferrer">@ADV Tecnologia</a>',
			home: 'Moro em São Roque, SP, Brasil',
			homeland: 'De Isesaki, Gunma, Japão'
		},
		facts: {
			title: 'Fatos aleatórios',
			character: 'Meu personagem favorito é o Homem-Aranha.',
			entertainment: 'Sou apaixonado em jogar videogames.',
			movie: 'Assisto filmes/desenhos de ação e sci-fi.',
			hobby: 'Gosto de tocar guitarra no tempo livre.',
			music: 'Adoro escutar metal, synthwave e antiguidades.'
		},

		actions: {
			knowledge: 'Conhecimentos',
			setup: 'Equipamento',
			about: 'Sobre mim',
			timeline: 'Linha do tempo'
		},

		knowledge: {
			title: 'Conhecimentos',

			metadata: {
				title: 'Conhecimentos',
				description:
					'Aqui destaco as tecnologias e ferramentas que tenho conhecimento e prática em desenvolver os meus trabalhos.'
			},

			languages: 'Linguagens',
			runtime: 'Runtime',
			libs: 'Bibliotecas',
			frameworks: 'Frameworks',
			styling: 'Estilização',
			databases: 'Banco de dados',
			versionControl: 'Versionamento',
			packageManagers: 'Gerenciadores',
			platforms: 'Plataformas',
			plugins: 'Plugins',
			bundlers: 'Empacotadores',
			tools: 'Ferramentas'
		},

		setup: {
			title: 'Equipamento',

			metadata: {
				title: 'Equipamento',
				description: 'Aqui mostro o equipamento que eu tenho atualmente para trabalhar e estudar.'
			},

			link: 'Pesquisar',

			motherboard: 'Placa-mãe',
			cpu: 'CPU',
			ram: 'RAM',
			gpu: 'GPU',
			ssd: 'SSD',
			hdd: 'HDD',
			cooler: 'Cooler',
			powerSupply: 'Fonte',
			pcTower: 'Gabinete',
			monitor: 'Monitor',
			keyboard: 'Teclado',
			mouse: 'Mouse',
			audioInterface: 'Interface de áudio',
			headset: 'Headset',
			microphone: 'Microfone'
		},

		timeline: {
			title: 'Linha do tempo',

			metadata: {
				title: 'Linha do tempo',
				description:
					'Aqui conto brevemente a minha jornada de desenvolvedor full-stack e algumas curiosidades sobre mim.'
			},

			events: {
				highSchool: {
					title: 'Concluí o ensino médio',
					description: 'Completei os estudos do ensino médio'
				},
				startEtec: {
					title: 'Ingressei num curso técnico',
					description: 'Comecei a estudar Técnico de Informática na Etec São Roque'
				},
				endEtec: {
					title: 'Concluí o curso técnico',
					description: 'Completei os estudos de Técnico de Informática na Etec São Roque'
				},
				startFatec: {
					title: 'Ingressei num curso superior',
					description: 'Comecei a estudar Sistemas para Internet na Fatec São Roque'
				},
				endFatec: {
					title: 'Graduação',
					description:
						'Consegui concluir minha graduação em Sistemas para Internet na Fatec São Roque'
				},
				internshipADV: {
					title: 'Ingressei num estágio',
					description: 'Comecei a trabalhar como estagiário na ADV Tecnologia'
				},
				startADV: {
					title: 'Primeiro emprego',
					description: 'Comecei a trabalhar como desenvolvedor front-end na ADV Tecnologia'
				},
				promoADV: {
					title: 'Promoção',
					description: 'Fui promovido a desenvolvedor full-stack na ADV Tecnologia'
				},
				websiteLaunch: {
					title: 'Lançamento do meu site',
					description:
						'Lancei meu website pessoal, com o objetivo de compartilhar meu trabalho e conhecimento'
				}
			},

			visit: 'Visitar'
		}
	},

	projects: {
		title: 'Projetos',
		paragraph:
			'Alguns destaques dos meus projetos open-source. Veja todos no <a href="https://github.com/gustavomorinaga?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>.',

		metadata: {
			title: 'Projetos',
			description: 'Alguns destaques dos meus projetos open-source.'
		},

		gesture: 'Arraste para visualizar',

		links: {
			deploy: 'Demo',
			code: 'Código',
			wip: 'Em desenvolvimento'
		},

		copyscotch: {
			description: 'Uma implementação do Hoppscotch feita com SvelteKit.'
		},
		'google-like-search-engine': {
			description: 'Um mecanismo de busca simples que imita o mecanismo de busca do Google.'
		},
		nostra: {
			description: 'Um e-commerce feito com MedusaJS, SvelteKit e TailwindCSS.'
		},
		'matching-game': {
			description: 'Um jogo de memória simples feito com SvelteKit e TypeScript.'
		},
		portfolio: {
			description: 'Meu super portfólio desenvolvido com SvelteKit e hospedado na Vercel.'
		},
		'next-plate': {
			description: 'Um super modelo de projeto para Next.js com pacote de ferramentas incríveis.'
		},
		'github-unfollow-checker': {
			description:
				'Uma ferramenta simples para consultar os usuários que não te seguem de volta no GitHub.'
		},
		hotcode: {
			description: 'Um hotsite para atrair desenvolvedores iniciantes a aprender sobre programação.'
		}
	},

	bookmarks: {
		title: 'Marcadores',
		paragraph: 'Minha lista de marcadores úteis e interessantes que uso constantemente.',

		metadata: {
			title: 'Marcadores',
			description: 'Minha lista de marcadores úteis e interessantes que uso constantemente.'
		},

		filters: {
			all: 'Todos',
			design: 'Design',
			devtools: 'Ferramentas',
			tips: 'Dicas'
		},

		help: 'Clique para filtrar os marcadores e facilitar a sua vida.'
	},

	player: {
		show: 'Mostrar player',

		link: 'Abrir no SoundCloud',

		shuffle: 'Aleatório',
		prev: 'Anterior',
		play: 'Reproduzir',
		pause: 'Pausar',
		next: 'Próxima',
		repeat: 'Repetir',

		volume: 'Volume',
		playlist: 'Abrir playlist',
		hide: 'Esconder player'
	},

	error: {
		title: 'Perdido no sistema?',
		paragraph: 'Essa página não foi encontrada ou não existe.',

		return: 'Voltar ao início'
	},

	scrollTop: 'Ir ao topo',

	footer: {
		developedBy: `Desenvolvido com ❤ por Gustavo Morinaga © ${year}`,
		poweredBy: 'Turbinado por'
	},

	cookieConsent: {
		title: 'Cookies',
		paragraph:
			'Este website utiliza cookies e tecnologias similares para melhorar a sua experiência de navegação.',
		confirm: 'Okay'
	},

	achievements: {
		GMD_404: {
			title: 'Desafiando o Desconhecido',
			description: 'Entre em uma página inexistente'
		},
		GMD_LOGO: {
			title: 'Clicador Mestre',
			description: 'Clique na logotipo 5 vezes'
		},
		GMD_SOCIAL: {
			title: 'Olá mundo!',
			description: 'Clique uma rede social para entrar em contato'
		},
		GMD_BLOG: {
			title: 'Leitor Voraz',
			description: 'Leia 3 artigos do blog'
		},
		GMD_PROJECT: {
			title: 'Explorador de Projetos',
			description: 'Visite ou veja código de um projeto'
		},
		GMD_SETUP: {
			title: 'Santuário Sagrado',
			description: 'Clique em um componente do equipamento'
		},
		GMD_SONG: {
			title: 'Solta o som, DJ!',
			description: 'Escute 3 músicas seguidas'
		}
	}
};
