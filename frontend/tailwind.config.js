/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#38124A',
                foreground: '#FFFFFF',
                'glass-dark': 'rgba(20, 5, 30, 0.6)',
                'glass-light': 'rgba(255, 255, 255, 0.05)',
                accent: {
                    pink: '#EC4186',
                    orange: '#EE544A',
                    purple: '#EC4186',
                    blue: '#EC4186',
                    cyan: '#EE544A',
                    glow: 'rgba(236, 65, 134, 0.4)',
                }
            },
            boxShadow: {
                'glow': '0 0 20px rgba(236, 65, 134, 0.4)',
                'glow-orange': '0 0 20px rgba(238, 84, 74, 0.4)',
                'premium': '0 10px 40px -10px rgba(20, 5, 30, 0.8)',
            },
            animation: {
                'blob': 'blob 7s infinite',
                'float': 'float 3s ease-in-out infinite',
                'ripple': 'ripple 0.6s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                }
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [],
}
