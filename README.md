<p align="center">
  <img
    src=".github/assets/mizuhara.jpg"
    width="250px"
    style="border-radius: 50%;"
  />
</p>

# Mizuhara

Utility functions and presets to use with Tailwind CSS.

<p align="center">
  <img
    alt="Repository size"
    src="https://img.shields.io/github/repo-size/fellipeutaka/mizuhara"
  />
  <a href="https://www.linkedin.com/in/fellipeutaka/">
    <img
      alt="Made by Fellipe Utaka"
      src="https://img.shields.io/badge/made%20by-Fellipe%20Utaka-%2304D361"
    />
  </a>
  <a href="https://github.com/fellipeutaka/mizuhara/commits/main">
    <img
      alt="GitHub last commit"
      src="https://img.shields.io/github/last-commit/fellipeutaka/mizuhara"
    />
  </a>
  <img
    alt="License"
    src="https://img.shields.io/badge/license-MIT-brightgreen"
  />
  <a href="https://github.com/fellipeutaka/mizuhara/stargazers">
    <img
      alt="Stargazers"
      src="https://img.shields.io/github/stars/fellipeutaka/mizuhara"
    />
  </a>
</p>

## Installation

```bash
pnpm i mizuhara -D
```

## Usage

### Plugins

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { typeNumberReset, videoReset } from "mizuhara/plugins";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [typeNumberReset, videoReset],
};

export default config;
```

#### shadcn/ui

```ts
// tailwind.config.ts
import { createShadcnPreset } from "mizuhara/plugins";
import type { Config } from "tailwindcss";

const config = {
  presets: [createShadcnPreset()],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
```

### Utils

```ts
// card.tsx
import { forwardRef } from "react";

import { cn } from "mizuhara/utils";

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
```
