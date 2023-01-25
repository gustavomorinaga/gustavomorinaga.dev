const plugin = require('tailwindcss/plugin');

const customPlugin = plugin(({ addComponents, matchUtilities, theme }) => {
	addComponents({
		'.scrollbar__theme': {
			'@apply scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary hover:scrollbar-thumb-primary-focus':
				{}
		},
		'.typewriter': {
			'@apply inline-flex overflow-hidden border-solid border-primary opacity-50 animate-typing animate-typing':
				{},
			borderRightWidth: '0.25rem'
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
				retro: ['Righteous', 'cursive'],
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
				typing:
					'typing 3.5s steps(100, end), blink-caret 0.75s ease-out infinite, low-opacity 2s ease-out',
				glitch: 'glitch 1s linear',
				'spin-background': 'spin-background 3s linear infinite',
				float: 'float 5s ease 4.9s infinite alternate'
			},
			keyframes: {
				typing: {
					from: {
						maxWidth: '0'
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
				'low-opacity': {
					'0%, 95%': {
						opacity: 1
					},
					to: {
						opacity: 0.5
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
			}
		}
	},
	daisyui: {
		themes: [
			{
				synthwave: {
					...require('daisyui/src/colors/themes')['[data-theme=synthwave]'],
					primary: '#ef4444',
					secondary: '#7A3A8C',
					accent: '#f94c0d',
					'--rounded-box': '0rem',
					'--rounded-btn': '0rem',
					'--rounded-badge': '0rem'
				}
			}
		]
	}
};
