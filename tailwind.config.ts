import { nextui } from "@nextui-org/react"
import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: "class",
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        subtle: {
          dark: "#2C2626",
          light: "#959595",
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#191414",
            foreground: "#FFFFFF",
          },
        },
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#191414",
          },
        },
      },
    }),
  ],
} as Config
