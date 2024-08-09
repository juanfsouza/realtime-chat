import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFA726',
          DEFAULT: '#FF7043',
          dark: '#F4511E', 
        },
        bg: {
          950: '#0a0a0a', 
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FFA726, #F4511E)',
      },
    },
  },
  plugins: [],
};
export default config;
