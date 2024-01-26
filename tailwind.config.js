/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./components/**/*.{ts,tsx}",
    "./template/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./util/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        foreground: {
          disabled: {
            light:
              "rgb(var(--color-light-foreground-disabled) / <alpha-value>)",
            dark: "rgb(var(--color-dark-foreground-disabled) / <alpha-value>)",
          },
          base: {
            1: {
              light:
                "rgb(var(--color-light-foreground-base-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-base-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-foreground-base-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-base-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-foreground-base-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-base-3) / <alpha-value>)",
            },
          },
          hover: {
            1: {
              light:
                "rgb(var(--color-light-foreground-hover-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-hover-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-foreground-hover-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-hover-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-foreground-hover-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-hover-3) / <alpha-value>)",
            },
          },
          pressed: {
            1: {
              light:
                "rgb(var(--color-light-foreground-pressed-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-pressed-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-foreground-pressed-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-pressed-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-foreground-pressed-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-foreground-pressed-3) / <alpha-value>)",
            },
          },
        },
        background: {
          alpha: {
            light: "rgb(var(--color-light-background-alpha) / <alpha-value>)",
            dark: "rgb(var(--color-dark-background-alpha) / <alpha-value>)",
          },
          disabled: {
            light:
              "rgb(var(--color-light-background-disabled) / <alpha-value>)",
            dark: "rgb(var(--color-dark-background-disabled) / <alpha-value>)",
          },
          base: {
            1: {
              light:
                "rgb(var(--color-light-background-base-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-base-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-background-base-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-base-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-background-base-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-base-3) / <alpha-value>)",
            },
          },
          hover: {
            1: {
              light:
                "rgb(var(--color-light-background-hover-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-hover-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-background-hover-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-hover-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-background-hover-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-hover-3) / <alpha-value>)",
            },
          },
          pressed: {
            1: {
              light:
                "rgb(var(--color-light-background-pressed-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-pressed-1) / <alpha-value>)",
            },
            2: {
              light:
                "rgb(var(--color-light-background-pressed-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-pressed-2) / <alpha-value>)",
            },
            3: {
              light:
                "rgb(var(--color-light-background-pressed-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-background-pressed-3) / <alpha-value>)",
            },
          },
        },
        stroke: {
          base: {
            1: {
              light: "rgb(var(--color-light-stroke-base-1) / <alpha-value>)",
              dark: "rgb(var(--color-dark-stroke-base-1) / <alpha-value>)",
            },
            2: {
              light: "rgb(var(--color-light-stroke-base-2) / <alpha-value>)",
              dark: "rgb(var(--color-dark-stroke-base-2) / <alpha-value>)",
            },
            3: {
              light: "rgb(var(--color-light-stroke-base-3) / <alpha-value>)",
              dark: "rgb(var(--color-dark-stroke-base-3) / <alpha-value>)",
            },
          },
          hover: {
            light: "rgb(var(--color-light-stroke-hover-1) / <alpha-value>)",
            dark: "rgb(var(--color-dark-stroke-hover-1) / <alpha-value>)",
          },
          pressed: {
            light: "rgb(var(--color-light-stroke-pressed-1) / <alpha-value>)",
            dark: "rgb(var(--color-dark-stroke-pressed-1) / <alpha-value>)",
          },
        },
      },
    },
  },
  plugins: [],
};
