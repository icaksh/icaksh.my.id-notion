/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/pages/**/*.{js,jsx,ts,tsx}",
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/templates/**/*.{js,jsx,ts,tsx}"
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
      typography: theme => ({
        default: {
          css: {
            pre: {
              color: theme("colors.grey.1000"),
              backgroundColor: theme("colors.grey.100")
            },
            "pre code::before": {
              "padding-left": "unset"
            },
            "pre code::after": {
              "padding-right": "unset"
            },
            code: {
              backgroundColor: theme("colors.grey.100"),
              color: "#DD1144",
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            "code::before": {
              content: '""',
              "padding-left": "0.25rem"
            },
            "code::after": {
              content: '""',
              "padding-right": "0.25rem"
            }
          }
        }
      })
    },
    plugins: [require("@tailwindcss/typography")],
}