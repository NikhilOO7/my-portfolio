/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}', // All files in src
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Pages directory
        './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Components directory
        './src/sections/**/*.{js,ts,jsx,tsx,mdx}', // Sections directory (if any)
        './src/app/**/*.{js,ts,jsx,tsx,mdx}', // App directory
        './src/styles/**/*.{css}', // Styles directory
        './src/**/*.{html,js,jsx,ts,tsx,mdx,css}', // Catch-all for any file type
    ],
    theme: {
        extend: {
            colors: {
                'jarvis-blue': {
                    100: '#e6f0ff',
                    200: '#b3d1ff',
                    300: '#80b2ff',
                    400: '#4d94ff',
                    500: '#1976ff',
                    600: '#145dcc',
                    700: '#0f4499',
                    800: '#0a2c66',
                    900: '#051433',
                },
                'jarvis-dark': {
                    100: '#666666',
                    200: '#4d4d4d',
                    300: '#333333',
                    400: '#1a1a1a',
                    500: '#0d0d0d',
                    600: '#080808',
                    700: '#030303',
                    800: '#020202',
                    900: '#000000',
                },
                'jarvis-accent': {
                    500: '#00d4ff',
                },
                'reactor-blue': 'rgba(0, 212, 255, 0.8)',
                'reactor-blue-dark': 'rgba(0, 212, 255, 0.8)',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Exo 2', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float-smooth': 'float-smooth 5s ease-in-out infinite',
                'scan-line': 'scan-line 4s linear infinite',
                'parallax-drift': 'parallax-drift 10s ease-in-out infinite',
                'rotate-left-0': 'rotate-left 4s linear infinite',
                'rotate-right-0': 'rotate-right 2s linear infinite',
                'rotate-left-right-0': 'rotate-left-right 20s infinite ease-in',
                'rotate-only-0': 'rotate-only 10s infinite ease-in',
                'rotate-left-0.01': 'rotate-left 400s linear infinite',
                'rotate-right-0.01': 'rotate-right 200s linear infinite',
                'rotate-left-right-0.01': 'rotate-left-right 2000s infinite ease-in',
                'rotate-only-0.01': 'rotate-only 1000s infinite ease-in',
                'rotate-left-0.1': 'rotate-left 40s linear infinite',
                'rotate-right-0.1': 'rotate-right 20s linear infinite',
                'rotate-left-right-0.1': 'rotate-left-right 200s infinite ease-in',
                'rotate-only-0.1': 'rotate-only 100s infinite ease-in',
                'rotate-left-0.5': 'rotate-left 8s linear infinite',
                'rotate-right-0.5': 'rotate-right 4s linear infinite',
                'rotate-left-right-0.5': 'rotate-left-right 40s infinite ease-in',
                'rotate-only-0.5': 'rotate-only 20s infinite ease-in',
                'rotate-left-1.5': 'rotate-left 2.67s linear infinite',
                'rotate-right-1.5': 'rotate-right 1.33s linear infinite',
                'rotate-left-right-1.5': 'rotate-left-right 13.33s infinite ease-in',
                'rotate-only-1.5': 'rotate-only 6.67s infinite ease-in',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(25, 118, 255, 0.3)' },
                    '50%': { boxShadow: '0 0 20px rgba(25, 118, 255, 0.7)' },
                },
                'float-smooth': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                'scan-line': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'parallax-drift': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(10px, -10px)' },
                },
                'rotate-left': {
                    'from': { transform: 'rotate(360deg)' },
                    'to': { transform: 'rotate(0)' },
                },
                'rotate-right': {
                    'from': { transform: 'rotate(0)' },
                    'to': { transform: 'rotate(360deg)' },
                },
                'rotate-left-right': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0)' },
                    '30%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                    '50%': { transform: 'translate(-50%, -50%) rotate(0)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                },
                'rotate-only': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0)' },
                    '30%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                    '50%': { transform: 'translate(-50%, -50%) rotate(0)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                },
            },
            rotate: {
                '30': '30deg',
                '55': '55deg',
                '125': '125deg',
                '165': '165deg',
            },
            boxShadow: {
                'jarvis-glow': '0 0 12px rgba(25, 118, 255, 0.5), 0 0 24px rgba(25, 118, 255, 0.3)',
            },
            backgroundImage: {
                'jarvis-grid': 'linear-gradient(to right, rgba(25, 118, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(25, 118, 255, 0.1) 1px, transparent 1px)',
            },
        },
    },
    plugins: [],
};