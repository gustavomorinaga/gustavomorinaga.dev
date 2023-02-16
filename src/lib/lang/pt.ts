import type { ILang } from '$lib/types';

const year = new Date().getFullYear();

export const pt: ILang = {
	code: 'pt',

	header: {
		logo: {
			alt: 'Página inicial'
		},

		home: 'Página inicial',
		blog: 'Blog',
		about: 'Sobre mim',
		projects: 'Projetos',
		bookmark: 'Marcadores',
		lang: 'Trocar idioma'
	},

	home: {
		blurb: {
			title: 'Saudações! Eu sou',
			paragraph:
				'Desenvolvedor full-stack criativo e apaixonado em criar soluções completas, eficientes e de alta tecnologia.',
			skillDev: 'Dev Full-Stack',
			skillDesign: 'UI/UX Designer',
			skillExp: '+2 anos de experiência'
		},

		about: {
			title: 'Sobre mim',
			subtitle: 'Full-Stack Developer & UI/UX Designer',
			paragraph:
				'Meu nome é Gustavo Morinaga, tenho 22 anos, sou desenvolvedor Full-Stack e UI/UX Designer. Desenvolvo sites e aplicações completas com as melhores tecnologias disponíveis no mercado. Sempre estou em constante aprendizado e com o objetivo de entregar a melhor experiência e performance possível.',
			quote: 'Não é a linguagem de programação que define o programador, mas sim sua lógica.',
			moreDetails: 'Mais detalhes'
		},

		knowledge: {
			title: 'Conhecimentos',
			paragraph:
				'Múltiplas tecnologias, múltiplas possibilidades em solucionar múltiplos problemas...'
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

	player: {
		show: 'Mostrar player',

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

	scrollTop: 'Ir para o topo',

	footer: `Desenvolvido com ❤ por Gustavo Morinaga © ${year}`
};
