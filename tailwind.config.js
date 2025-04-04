import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        bgMain: '#1E1E1E',
        bgPrimary: '#004FB2',
        bgSecondary: '#494D4F',
        bgTertiary: '#EBEBEB',
        textPrimary: '#1A1A1A',
        textSecondary: '#FAFAFA',
        textTertiary: '#ABABAB',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;