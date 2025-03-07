import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale": {
          "0%": {
            transform: "scale(0.95)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-down": "fade-down 0.5s ease-out",
        "scale": "scale 0.3s ease-out",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.800'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.neutral.800'),
              fontWeight: theme('fontWeight.bold'),
            },
            blockquote: {
              borderLeftColor: theme('colors.neutral.200'),
            },
            code: {
              color: theme('colors.neutral.700'),
              backgroundColor: theme('colors.neutral.100'),
              paddingLeft: theme('spacing.1'),
              paddingRight: theme('spacing.1'),
              paddingTop: theme('spacing.0.5'),
              paddingBottom: theme('spacing.0.5'),
              borderRadius: theme('borderRadius.md'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.neutral.200'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.white'),
              fontWeight: theme('fontWeight.bold'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            blockquote: {
              borderLeftColor: theme('colors.neutral.700'),
            },
            code: {
              color: theme('colors.neutral.200'),
              backgroundColor: theme('colors.neutral.800'),
            },
            strong: {
              color: theme('colors.neutral.100'),
            },
            ul: {
              li: {
                '&::before': {
                  backgroundColor: theme('colors.neutral.400'),
                }
              }
            },
            ol: {
              li: {
                '&::marker': {
                  color: theme('colors.neutral.400'),
                }
              }
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
