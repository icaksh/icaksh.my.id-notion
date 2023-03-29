/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/pages/**/*.{js,jsx,ts,tsx}",
      "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          light: "rgb(var(--color-light) / <alpha-value>)",
          success: "rgb(var(--color-success) / <alpha-value>)",
          info: "rgb(var(--color-info) / <alpha-value>)",
          warn: "rgb(var(--color-warn) / <alpha-value>)",
          error: "rgb(var(--color-error) / <alpha-value>)",
          transparent: "transparent",
          current: "currentColor",
        },
      },
    },
    plugins: [],
}