/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				synthwave: "url('images/svgs/synthwave.svg')"
			}
		}
	},
	plugins: [require('daisyui')]
};
