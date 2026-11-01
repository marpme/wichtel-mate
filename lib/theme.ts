import { Themes } from "@geist-ui/core";

// Bright "hearth" theme: warm off-white background, apple-ink text, apple-red
// accents (links, eyebrows, primary action), holly green for success.
// Layout/expressiveness follow Apple-ish tokens: larger radii and soft,
// neutral, layered shadows instead of Geist's defaults.
export const hearthTheme = Themes.createFromLight({
  type: "hearth",
  palette: {
    background: "#fffaf7",
    foreground: "#1d1d1f",
    selection: "#fbd9d3",
    secondary: "#b0665c",
    border: "#e8e0dc",
    code: "#d0342c",
    accents_1: "#faf0ec",
    accents_2: "#f6e3dd",
    accents_3: "#efd2ca",
    accents_4: "#e3b5ab",
    accents_5: "#d49287",
    accents_6: "#c06f62",
    accents_7: "#a04c41",
    accents_8: "#7c312a",
    success: "#3e9e63",
    successLight: "#55b87a",
    successDark: "#2c7a4a",
    successLighter: "#e3f4ea",
    error: "#d0342c",
    errorLight: "#e05545",
    errorDark: "#a02520",
    errorLighter: "#fdecea",
    warning: "#e8a13c",
    warningLight: "#f2b45c",
    warningDark: "#b57a24",
    warningLighter: "#fdf1e0",
    link: "#d0342c",
  },
  layout: {
    radius: "12px",
  },
  expressiveness: {
    shadowSmall: "0 1px 2px rgba(0, 0, 0, 0.04)",
    shadowMedium: "0 2px 6px rgba(0, 0, 0, 0.06)",
    shadowLarge: "0 8px 24px rgba(0, 0, 0, 0.08)",
    dropdownBoxShadow: "0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.10)",
  },
});
