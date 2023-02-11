const plugin = require('tailwindcss/plugin');

const customPlugin = plugin(({ addComponents, matchUtilities, theme }) => {
	addComponents({
		'.scrollbar__theme': {
			'@apply scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary hover:scrollbar-thumb-primary-focus':
				{}
		},
		'.typewriter': {
			'@apply inline-flex max-w-full pr-1 overflow-hidden border-r-2 border-solid border-primary animate-typing':
				{}
		}
	});

	matchUtilities(
		{
			'text-shadow': value => ({
				textShadow: value
			})
		},
		{ values: theme('textShadow') }
	);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
		require('tailwind-scrollbar'),
		customPlugin
	],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Karla', 'sans-serif'],
				mono: ['Courier Prime', 'monospace'],
				futuristic: ['Orbitron', 'sans-serif'],
				handwritten: ['Caveat', 'cursive']
			},
			height: {
				'gutter-header': 'calc(100vh - 5.5rem)'
			},
			backgroundImage: {
				'gradient-conic':
					'linear-gradient(var(--tw-gradient-from), var(--tw-gradient-from)), linear-gradient(var(--tw-gradient-to), var(--tw-gradient-to)), linear-gradient(var(--tw-gradient-from), var(--tw-gradient-from)), linear-gradient(var(--tw-gradient-to), var(--tw-gradient-to));'
			},
			boxShadow: {
				glow: '0 0 0.5rem 0.25rem var(--tw-shadow-color)'
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				md: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				glow: '0 0 0.5rem var(--tw-shadow-color)',
				rgb: '2px 0px 2px rgb(255 0 255 / 50%), -2px 0px 2px rgb(0 255 191 / 50%), 0px 0px 10px rgb(49 122 255)'
			},
			animation: {
				typing: 'typing 3.5s steps(100, end) 0.5s, blink-caret 0.75s ease-out infinite',
				glitch: 'glitch 1s linear',
				'spin-background': 'spin-background 3s linear infinite',
				float: 'float 5s ease 4.9s infinite alternate'
			},
			keyframes: {
				typing: {
					from: {
						maxWidth: '0%'
					},
					to: {
						maxWidth: '100%'
					}
				},
				'blink-caret': {
					'from, to': {
						borderColor: 'transparent'
					},
					'50%': {
						borderColor: 'hsl(var(--p)/var(--tw-border-opacity))'
					}
				},
				glitch: {
					'0%': {
						backgroundPosition: '0 0',
						filter: 'hue-rotate(0deg)'
					},
					'10%': {
						backgroundPosition: '2px 0'
					},
					'20%': {
						backgroundPosition: '-2px 0'
					},
					'30%': {
						backgroundPosition: '2px 0'
					},
					'40%': {
						backgroundPosition: '-2px 0'
					},
					'50%': {
						backgroundPosition: '0 0'
					},
					'60%': {
						backgroundPosition: '0 0'
					},
					'70%': {
						backgroundPosition: '5px 0'
					},
					'80%': {
						backgroundPosition: '-5px 0'
					},
					'100%': {
						backgroundPosition: '0 0',
						filter: 'hue-rotate(360deg)'
					}
				},
				'spin-background': {
					'100%': {
						transform: 'rotate(1turn)'
					}
				},
				float: {
					'0%': {
						boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
						transform: 'translateY(0px)'
					},
					'50%': {
						boxShadow: '0 25px 15px 0px rgba(0,0,0,0.2)',
						transform: 'translateY(-20px)'
					},
					'100%': {
						boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
						transform: 'translateY(0px)'
					}
				}
			},
			transitionTimingFunction: {
				smooth: 'cubic-bezier(0.5, 0, 0, 1)'
			}
		}
	},
	daisyui: {
		themes: [
			{
				synthwave: {
					...require('daisyui/src/colors/themes')['[data-theme=black]'],
					primary: '#EF4444',
					secondary: '#F839F8',
					accent: '#F87139',
					neutral: '#535353',
					'base-100': '#100F10',
					'base-200': '#1B1B1B',
					'base-300': '#242424',
					info: '#3747F0',
					success: '#2BF063',
					warning: '#F0D05B',
					error: '#F02B2B',
					'--rounded-box': '0.125rem',
					'--rounded-btn': '0.125rem',
					'--rounded-badge': '0.125rem',
					'--animation-btn': '0.3s',
					'--animation-input': '0.3s',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.125rem'
				}
			}
		]
	}
};
