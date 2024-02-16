import {
  hexToHsl,
  hslToSting,
  isHexColor,
  isHslColor,
  removeHslString,
} from "../../utils/color";
import type {
  ColorsToCamelCase,
  HslString,
  RecursivePartial,
  SetOptional,
  Theme,
  ThemeColors,
  ThemeConfig,
  ToHslString,
} from "./types";

export function defineShadcnTheme<T extends SetOptional<ThemeConfig, "dark">>(
  config: T,
): Theme {
  const { base = {}, dark, light } = config;
  return {
    ":root": {
      "--radius": base.radius
        ? typeof base.radius === "number"
          ? `${base.radius}px`
          : base.radius
        : "0",
      ...(base.fontFamily
        ? {
            "--font-sans": Array.isArray(base.fontFamily)
              ? base.fontFamily.join(", ")
              : base.fontFamily,
          }
        : {}),
      ...toCSSRuleObject(light),
    },
    ...(dark ? { ".dark": toCSSRuleObject(dark) } : {}),
  };
}

export function overrideShadcnTheme<T extends RecursivePartial<ThemeConfig>>(
  config: T,
): Theme {
  const { base = {}, dark = {}, light = {} } = config;
  return {
    ":root": {
      "--radius": base.radius
        ? typeof base.radius === "number"
          ? `${base.radius}px`
          : base.radius
        : "0.5rem",
      ...(base.fontFamily
        ? {
            "--font-sans": Array.isArray(base.fontFamily)
              ? base.fontFamily.join(", ")
              : base.fontFamily,
          }
        : {}),
      ...toCSSRuleObject({
        background: "0 0% 100%",
        foreground: "222.2 47.4% 11.2%",

        muted: "210 40% 96.1%",
        mutedForeground: "215.4 16.3% 46.9%",

        popover: "0 0% 100%",
        popoverForeground: "222.2 47.4% 11.2%",

        card: "0 0% 100%",
        cardForeground: "222.2 47.4% 11.2%",

        border: "214.3 31.8% 91.4%",
        input: "214.3 31.8% 91.4%",

        primary: "222.2 47.4% 11.2%",
        primaryForeground: "210 40% 98%",

        secondary: "210 40% 96.1%",
        secondaryForeground: "222.2 47.4% 11.2%",

        accent: "210 40% 96.1%",
        accentForeground: "222.2 47.4% 11.2%",

        destructive: "0 100% 50%",
        destructiveForeground: "210 40% 98%",

        ring: "215 20.2% 65.1%",

        ...light,
      }),
    },
    ...(dark
      ? {
          ".dark": toCSSRuleObject({
            background: "224 71% 4%",
            foreground: "213 31% 91%",

            muted: "223 47% 11%",
            mutedForeground: "215.4 16.3% 56.9%",

            accent: "216 34% 17%",
            accentForeground: "210 40% 98%",

            popover: "224 71% 4%",
            popoverForeground: "215 20.2% 65.1%",

            border: "216 34% 17%",
            input: "216 34% 17%",

            card: "224 71% 4%",
            cardForeground: "213 31% 91%",

            primary: "210 40% 98%",
            primaryForeground: "222.2 47.4% 1.2%",

            secondary: "222.2 47.4% 11.2%",
            secondaryForeground: "210 40% 98%",

            destructive: "0 63% 31%",
            destructiveForeground: "210 40% 98%",

            ring: "216 34% 17%",

            ...dark,
          }),
        }
      : {}),
  };
}

function toCSSRuleObject(
  colors: ColorsToCamelCase<ThemeColors>,
): ToHslString<ThemeColors> {
  return Object.entries(colors).reduce<ToHslString<ThemeColors>>(
    (agg, [key, value]) => {
      let color: HslString;
      if (typeof value === "string") {
        if (isHexColor(value)) {
          color = hslToSting(hexToHsl(value));
        } else if (isHslColor(removeHslString(value))) {
          color = removeHslString(value) as HslString;
        } else {
          throw new Error(`Invalid color value: ${value}`);
        }
      } else if (Array.isArray(value)) {
        if (value.length !== 3) {
          throw new Error(`Invalid color value: ${value}`);
        }

        if (value.some((v) => typeof v !== "number")) {
          throw new Error(`Invalid color value: ${value}`);
        }

        if (value[0] < 0 || value[0] > 360) {
          throw new Error(`Invalid color value: ${value}`);
        }

        color = `${value[0]} ${value[1]}% ${value[2]}%`;
      } else {
        throw new Error(`Invalid color value: ${value}`);
      }
      agg[
        "--".concat(
          key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
        ) as keyof ToHslString<ThemeColors>
      ] = color;
      return agg;
    },
    {} as ToHslString<ThemeColors>,
  );
}
