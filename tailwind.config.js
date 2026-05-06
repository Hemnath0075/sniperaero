/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0f1e",
        secondary: "#0d1b2a",
        accent: "#00d4ff",
        neon: "#39ff14",
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-neon': '0 0 20px rgba(57, 255, 20, 0.4)',
      },
    },
  },
  plugins: [],
}
