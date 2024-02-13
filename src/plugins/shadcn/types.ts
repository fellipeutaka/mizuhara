export type PluginOptions = {
  theme?: Theme;
};

type Hue = number;
type Saturation = number;
type Lightness = number;
export type HexString = `#${string}`;
export type HslString = `${Hue} ${Saturation}% ${Lightness}%`;
export type HslTuple = [hue: Hue, saturation: Saturation, lightness: Lightness];
type CssColor =
  | HslString
  | `hsl(${Hue}, ${Saturation}%, ${Lightness}%)`
  | HslTuple
  | HexString
  | (string & NonNullable<unknown>);
type Radius = string | `${number}rem` | number;

export type ThemeColors = {
  /**
   * Default backgrounds color of \<body />...etc
   */
  "--background": CssColor;
  /**
   * Default foregrounds color of \<body />...etc
   */
  "--foreground": CssColor;

  /**
   * Muted backgrounds such as \<TabsList />, \<Skeleton /> and \<Switch />
   */
  "--muted": CssColor;
  /**
   * Muted foregrounds such as \<TabsList />, \<Skeleton /> and \<Switch />
   */
  "--muted-foreground": CssColor;

  "--popover": CssColor;
  "--popover-foreground": CssColor;

  "--card": CssColor;
  "--card-foreground": CssColor;

  "--border": CssColor;
  "--input": CssColor;

  "--primary": CssColor;
  "--primary-foreground": CssColor;

  "--secondary": CssColor;
  "--secondary-foreground": CssColor;

  "--accent": CssColor;
  "--accent-foreground": CssColor;

  "--destructive": CssColor;
  "--destructive-foreground": CssColor;

  "--ring": CssColor;
};

type ConvertKey<S extends string> = S extends `--${infer T}-${infer U}`
  ? `${T}${Capitalize<ConvertKey<U>>}`
  : S extends `--${infer T}`
    ? T
    : S;

export type ColorsToCamelCase<T> = T extends object
  ? {
      [P in keyof T as ConvertKey<P & string>]: T[P];
    }
  : T;

export type ThemeConfig = {
  base?: {
    radius?: Radius;
    fontFamily?: string | string[];
  };
  light: ColorsToCamelCase<ThemeColors>;
  dark: ColorsToCamelCase<ThemeColors>;
};

export type Theme = {
  /**
   * Default theme
   */
  ":root": ToHslString<ThemeColors> & {
    "--radius": string;
    "--font-sans"?: string;
  };
  /**
   * Dark theme
   */
  ".dark"?: ToHslString<ThemeColors>;
};

export type ToHslString<T> = {
  [P in keyof T]: HslString;
};

export type SetOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>> extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};
