/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			height: {
				"90vh": "90vh",
				"91vh": "91vh",
			},
			padding: {
				"1px": "1px",
			},
		},
	},
	plugins: [],
};
