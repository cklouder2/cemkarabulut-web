const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],
	// Enable JIT mode for better performance
	mode: 'jit',
	// Optimize for production
	...(process.env.NODE_ENV === 'production' && {
		corePlugins: {
			// Disable unused utilities in production
			container: false,
		},
	}),
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-montserrat)"],
				montserrat: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"glow": "glow 2s ease-in-out infinite alternate",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0%",
					},
					"75%": {
						opacity: "0%",
					},
					"100%": {
						opacity: "100%",
					},
				},
				"fade-left": {
					"0%": {
						transform: "translateX(100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				"fade-right": {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": {
						"line-height": "0%",
						opacity: "0%",
					},
					"80%": {
						opacity: "100%",
					},

					"100%": {
						"line-height": "100%",
						opacity: "100%",
					},
				},
				"glow": {
					"0%": {
						"box-shadow": "0 0 20px rgba(255, 255, 255, 0.1)",
					},
					"100%": {
						"box-shadow": "0 0 30px rgba(255, 255, 255, 0.3)",
					},
				},
			},
			// Optimize for performance
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			// Optimize colors for better contrast
			colors: {
				zinc: {
					50: '#fafafa',
					100: '#f4f4f5',
					200: '#e4e4e7',
					300: '#d4d4d8',
					400: '#a1a1aa',
					500: '#71717a',
					600: '#52525b',
					700: '#3f3f46',
					800: '#27272a',
					900: '#18181b',
					950: '#09090b',
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
		// Custom plugin for performance optimizations
		function({ addUtilities, theme }) {
			const newUtilities = {
				'.text-balance': {
					'text-wrap': 'balance',
				},
				'.will-change-auto': {
					'will-change': 'auto',
				},
				'.will-change-scroll': {
					'will-change': 'scroll-position',
				},
				'.will-change-transform': {
					'will-change': 'transform',
				},
			}
			addUtilities(newUtilities)
		},
	],
};
