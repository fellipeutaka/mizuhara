import { type Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindAnimated from "tailwindcss-animated";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { shadcnThemes } from "./themes";

import type { PluginOptions } from "./types";

const shadcnPlugin = plugin.withOptions<PluginOptions>(
  (options = {}) => {
    return ({ addBase }) => {
      addBase({
        ...(options.theme ?? shadcnThemes.default),
        ...((options.applyBase ?? true) && {
          "*": {
            "@apply border-border": {},
          },
          body: {
            "@apply bg-background text-foreground antialiased": {},
            "font-feature-settings": `"rlig" 1, "calt" 1`,
          },
        }),
      });
    };
  },
  () => ({
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
        },
        colors: {
          border: "hsl(var(--border) / <alpha-value>)",
          input: "hsl(var(--input) / <alpha-value>)",
          ring: "hsl(var(--ring) / <alpha-value>)",
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
          primary: {
            DEFAULT: "hsl(var(--primary) / <alpha-value>)",
            foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
            foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
            foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          },
          muted: {
            DEFAULT: "hsl(var(--muted) / <alpha-value>)",
            foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "hsl(var(--accent) / <alpha-value>)",
            foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          },
          popover: {
            DEFAULT: "hsl(var(--popover) / <alpha-value>)",
            foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          },
          card: {
            DEFAULT: "hsl(var(--card) / <alpha-value>)",
            foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  }),
);

export function createShadcnPreset(options: PluginOptions = {}): Config {
  return {
    darkMode: ["class"],
    content: [],
    plugins: [tailwindAnimate, tailwindAnimated, shadcnPlugin(options)],
  };
}

export { defineShadcnTheme, overrideShadcnTheme } from "./utils";
export { shadcnThemes } from "./themes";
