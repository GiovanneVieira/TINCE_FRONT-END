/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#1A1A1A",
        "surface-elevated": "#262626",
        border: "#2A2A2A",
        primary: "#3B82F6",
        "primary-foreground": "#FFFFFF",
        danger: "#FF5C5C",
        muted: "#8A8A8A",
        "muted-foreground": "#A1A1A1",
        foreground: "#F5F5F5",
        accent: "#1E88E5",
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};
