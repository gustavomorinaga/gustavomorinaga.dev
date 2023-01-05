const plugin = require('tailwindcss/plugin');

const textShadowPlugin = plugin(function ({ matchUtilities, theme }) {
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
	plugins: [require('@tailwindcss/typography'), require('daisyui'), textShadowPlugin],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Share Tech Mono', 'monospace'],
				retro: ['Righteous', 'cursive'],
				handwritten: ['Caveat', 'cursive']
			},
			boxShadow: {
				glow: '0 0 0.5rem 0.25rem var(--tw-shadow-color)'
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				md: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				glow: '0 0 0.5rem var(--tw-shadow-color)'
			},
			animation: {
				glitch: 'glitch 1s linear infinite'
			},
			keyframes: {
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
				}
			}
		}
	},
	daisyui: {
		themes: [
			{
				synthwave: {
					...require('daisyui/src/colors/themes')['[data-theme=synthwave]'],
					'--rounded-box': '0rem',
					'--rounded-btn': '0rem',
					'--rounded-badge': '0rem'
				}
			}
		]
	}
};
