import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/plugins/index.ts", "src/utils/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: true,
  bundle: true,
});
