const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'grid-pattern':
                    "linear-gradient(to bottom, theme('colors.gray.900 / 0%'), theme('colors.gray.900 / 100%')), url('/images/noise.png')"
            },
            colors: {
                neutral: colors.slate,
                primary: colors.indigo,
                secondary: colors.cyan,
                info: colors.teal
            },
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    daisyui: {
        themes: [
            {
                darkmode: {
                    ...require('daisyui/src/theming/themes')['dark'],
                    primary: '#736cf5', // Indigo 600
                    'primary-content': '#e5e7eb', // Gray 200
                    secondary: '#0d9488', // Teal 600
                    'secondary-content': '#f3f4f6', // Gray 100
                    info: '#0d9488', // Teal 600
                    'info-content': '#e5e7eb', // Gray 200
                    background: '#1f2937', // Gray 800
                    'background-content': '#f3f4f6' // Gray 100
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
