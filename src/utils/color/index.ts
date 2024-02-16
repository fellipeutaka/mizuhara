import type {
  HexString,
  HslString,
  HslTuple,
} from "../../plugins/shadcn/types";

export function isHexColor(value: string): value is HexString {
  return /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

export function isHslColor(value: string): value is HslString {
  return /^\d{1,3}(\.\d+)?\s\d{1,3}(\.\d+)?%\s\d{1,3}(\.\d+)?%$/.test(value);
}

export function hslToSting(value: HslTuple): HslString {
  return `${value[0]} ${value[1]}% ${value[2]}%`;
}

export function hexToHsl(hex: HexString): HslTuple {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    }),
  );
  const r = parseInt(result?.[1] ?? "", 16) / 255;
  const g = parseInt(result?.[2] ?? "", 16) / 255;
  const b = parseInt(result?.[3] ?? "", 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s: number;
  let l = (max + min) / 2;

  if (max === min) {
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

export function removeHslString(value: string) {
  return value.replace(/hsl\((\d+), (\d+%), (\d+%)\)/, "$1 $2 $3");
}
