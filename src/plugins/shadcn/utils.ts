import type {
  ColorsToCamelCase,
  HexString,
  HslString,
  HslTuple,
  RecursivePartial,
  SetOptional,
  Theme,
  ThemeColors,
  ThemeConfig,
  ToHslString,
} from "./types";

export function defineShadcnTheme<T extends SetOptional<ThemeConfig, "dark">>(
  config: T
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
  config: T
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

function removeHslString(value: string) {
  return value.replace(/hsl\((\d+), (\d+%), (\d+%)\)/, "$1 $2 $3");
}

function toCSSRuleObject(
  colors: ColorsToCamelCase<ThemeColors>
): ToHslString<ThemeColors> {
  return Object.entries(colors).reduce<ToHslString<ThemeColors>>(
    (agg, [key, value]) => {
      let color: HslString;
      if (typeof value === "string") {
        if (isHexColor(value)) {
          color = hslToSting(rgbToHsl(value));
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
        ("--" +
          key.replace(
            /[A-Z]/g,
            (letter) => `-${letter.toLowerCase()}`
          )) as keyof ToHslString<ThemeColors>
      ] = color;
      return agg;
    },
    {} as ToHslString<ThemeColors>
  );
}

function isHexColor(value: string): value is HexString {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

function isHslColor(value: string): value is HslString {
  return /^\d{1,3}(\.\d+)?\s\d{1,3}(\.\d+)?%\s\d{1,3}(\.\d+)?%$/.test(value);
}

function hslToSting(value: HslTuple): HslString {
  return `${value[0]} ${value[1]}% ${value[2]}%`;
}

function rgbToHsl(hex: HexString): HslTuple {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  }) as HexString;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result?.[1] ?? "", 16);
  let g = parseInt(result?.[2] ?? "", 16);
  let b = parseInt(result?.[3] ?? "", 16);

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h) {
      h /= 6;
    }
  }

  h = Math.round((h ?? 0) * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}
