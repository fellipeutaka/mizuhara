import plugin from "tailwindcss/plugin";

export const typeNumberReset = plugin(({ addUtilities }) => {
  addUtilities([
    {
      ".type-number-reset": {
        "-moz-appearance": "textfield",
        "&::-webkit-inner-spin-button": {
          appearance: "none",
        },
        "&::-webkit-outer-spin-button": {
          appearance: "none",
        },
      },
    },
  ]);
});
