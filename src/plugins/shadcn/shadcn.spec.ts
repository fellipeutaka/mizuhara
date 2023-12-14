import { describe, it, expect } from "vitest";

import { defineShadcnTheme, overrideShadcnTheme, shadcnThemes } from ".";
import type { Theme } from "./types";

describe("shadcn plugin", () => {
  it("should be able to define a theme using shorthand and full HEX form", () => {
    const expectedTheme: Theme = {
      ":root": {
        "--background": "0 0% 0%",
        "--foreground": "0 0% 100%",

        "--muted": "210 40% 96%",
        "--muted-foreground": "215 16% 47%",

        "--popover": "0 0% 100%",
        "--popover-foreground": "222 46% 11%",

        "--card": "0 0% 100%",
        "--card-foreground": "222 46% 11%",

        "--border": "214 30% 91%",
        "--input": "214 30% 91%",

        "--primary": "222 46% 11%",
        "--primary-foreground": "210 40% 98%",

        "--secondary": "210 40% 96%",
        "--secondary-foreground": "222 46% 11%",

        "--accent": "210 40% 96%",
        "--accent-foreground": "222 46% 11%",

        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",

        "--ring": "215 20% 65%",

        "--radius": "0.5rem",
      },
    };

    const result = defineShadcnTheme({
      base: {
        radius: "0.5rem",
      },
      light: {
        background: "#000000",
        foreground: "#fff",

        muted: "#f1f5f9",
        mutedForeground: "#65758b",

        popover: "#ffffff",
        popoverForeground: "#0f1729",

        card: "#ffffff",
        cardForeground: "#0f1729",

        border: "#e1e7ef",
        input: "#e1e7ef",

        primary: "#0f1729",
        primaryForeground: "#f8fafc",

        secondary: "#f1f5f9",
        secondaryForeground: "#0f1729",

        accent: "#f1f5f9",
        accentForeground: "#0f1729",

        destructive: "#ff0000",
        destructiveForeground: "#f8fafc",

        ring: "#94a3b8",
      },
    });

    expect(result).toEqual(expectedTheme);
  });

  it("should be able to define a theme using string HSL form or tuple HSL form", () => {
    const expectedTheme: Theme = {
      ":root": {
        "--background": "0 0% 0%",
        "--foreground": "0 0% 100%",

        "--muted": "210 40% 96%",
        "--muted-foreground": "215 16% 47%",

        "--popover": "0 0% 100%",
        "--popover-foreground": "222 46% 11%",

        "--card": "0 0% 100%",
        "--card-foreground": "222 46% 11%",

        "--border": "214 30% 91%",
        "--input": "214 30% 91%",

        "--primary": "222 100% 50%",
        "--primary-foreground": "210 40% 98%",

        "--secondary": "210 40% 96%",
        "--secondary-foreground": "222 46% 11%",

        "--accent": "210 40% 96%",
        "--accent-foreground": "222 46% 11%",

        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",

        "--ring": "215 20% 65%",

        "--radius": "0.5rem",
      },
    };

    const result = defineShadcnTheme({
      base: {
        radius: "0.5rem",
      },
      light: {
        background: "#000000",
        foreground: "#fff",

        muted: "#f1f5f9",
        mutedForeground: "#65758b",

        popover: "#ffffff",
        popoverForeground: "#0f1729",

        card: "#ffffff",
        cardForeground: "#0f1729",

        border: "#e1e7ef",
        input: "#e1e7ef",

        primary: "hsl(222, 100%, 50%)",
        primaryForeground: [210, 40, 98],

        secondary: "#f1f5f9",
        secondaryForeground: "#0f1729",

        accent: "#f1f5f9",
        accentForeground: "#0f1729",

        destructive: "#ff0000",
        destructiveForeground: "#f8fafc",

        ring: "#94a3b8",
      },
    });

    expect(result).toEqual(expectedTheme);
  });

  it("should be able to override a theme", () => {
    const expectedTheme: Theme = {
      ...shadcnThemes.default,
      ":root": {
        ...shadcnThemes.default[":root"],
        "--primary": "222 100% 50%",
        "--primary-foreground": "210 40% 98%",
      },
    };

    const result = overrideShadcnTheme({
      light: {
        primary: "hsl(222, 100%, 50%)",
        primaryForeground: [210, 40, 98],
      },
    });

    expect(result).toEqual(expectedTheme);
  });

  it("should NOT be able to define a theme using invalid HEX form", () => {
    const invalidColor = "#ff";

    expect(() =>
      defineShadcnTheme({
        base: {
          radius: "0.5rem",
        },
        light: {
          background: "#000000",
          foreground: "#fff",

          muted: "#f1f5f9",
          mutedForeground: "#65758b",

          popover: "#ffffff",
          popoverForeground: "#0f1729",

          card: "#ffffff",
          cardForeground: "#0f1729",

          border: "#e1e7ef",
          input: "#e1e7ef",

          primary: "hsl(222, 100%, 50%)",
          primaryForeground: invalidColor,

          secondary: "#f1f5f9",
          secondaryForeground: "#0f1729",

          accent: "#f1f5f9",
          accentForeground: "#0f1729",

          destructive: "#ff0000",
          destructiveForeground: "#f8fafc",

          ring: "#94a3b8",
        },
      })
    ).toThrow(new Error(`Invalid color value: ${invalidColor}`));
  });

  it("should NOT be able to define a theme using invalid HEX form", () => {
    const invalidColor = [222, 100, 50, 50] as unknown as [
      number,
      number,
      number
    ];

    expect(() =>
      defineShadcnTheme({
        base: {
          radius: "0.5rem",
        },
        light: {
          background: "#000000",
          foreground: "#fff",

          muted: "#f1f5f9",
          mutedForeground: "#65758b",

          popover: "#ffffff",
          popoverForeground: "#0f1729",

          card: "#ffffff",
          cardForeground: "#0f1729",

          border: "#e1e7ef",
          input: "#e1e7ef",

          primary: "hsl(222, 100%, 50%)",
          primaryForeground: invalidColor,

          secondary: "#f1f5f9",
          secondaryForeground: "#0f1729",

          accent: "#f1f5f9",
          accentForeground: "#0f1729",

          destructive: "#ff0000",
          destructiveForeground: "#f8fafc",

          ring: "#94a3b8",
        },
      })
    ).toThrow(new Error(`Invalid color value: ${invalidColor}`));
  });
});
