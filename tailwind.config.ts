import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    typography: (_theme:any) => ({}),
    extend: {
      colors: {
        // For Dark Mode
        "blue": "#071e3d",
        "blue-shade-1": "#354467",
        "blue-shade-2": "#606E94",
        "blue-shade-3": "#8E9CC4",
        "blue-shade-4": "#BFCCF7",
        // For Light Mode
        "green": "#00322F",
        "green-shade-1": "#065956",
        "green-shade-2": "#3D837F",
        "green-shade-3": "#6AAFAB",
        "green-shade-4": "#98ded9",
        // Neutral Colors
        "white": "#FFFFFF",
        "neutral-shade-1": "#C6C6C6",
        "neutral-shade-2": "#919191",
        "neutral-shade-3": "#5E5E5E",
        "neutral-shade-4": "#303030",
        "black": "#000000",

        "shade-1": "#161412",
        "shade-2": "#262320",
        "shade-3": "#524C44",
        "shade-4": "#786F64",
        "shade-5": "#AFA292",
        "shade-6": "#CCBDAB",
        "shade-7": "#E8D8C3",
        "shade-8": "#F4E1CC",
        "shade-9": "#FFF7F0",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
