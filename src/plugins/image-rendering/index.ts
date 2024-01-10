import plugin from "tailwindcss/plugin";

export const imageRendering = plugin(({ addUtilities }) => {
  addUtilities([
    {
      ".rendering-auto": {
        imageRendering: "auto",
      },
      ".rendering-crisp-edges": {
        imageRendering: "crisp-edges",
      },
      ".rendering-pixelated": {
        imageRendering: "pixelated",
      },
    },
  ]);
});
