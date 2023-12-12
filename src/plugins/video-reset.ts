import plugin from "tailwindcss/plugin";

export const videoReset = plugin(({ addUtilities }) => {
  addUtilities([
    {
      ".video-reset": {
        "&::-webkit-media-controls": {
          display: "none",
        },
      },
    },
  ]);
});
