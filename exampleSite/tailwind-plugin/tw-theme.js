const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");
const themePath = path.join(__dirname, "../data/theme.json");
const themeRead = fs.readFileSync(themePath, "utf8");
const themeConfig = JSON.parse(themeRead);

// Find font name from font string
const findFont = (fontStr) =>
  fontStr.replace(/\+/g, " ").replace(/:[^:]+/g, "");

// Set font families dynamically, filtering out 'type' keys
const fontFamilies = Object.entries(themeConfig.fonts.font_family)
  .filter(([key]) => !key.includes("type"))
  .reduce((acc, [key, font]) => {
    acc[key] =
      `${findFont(font)}, ${themeConfig.fonts.font_family[`${key}_type`] || "sans-serif"}`;
    return acc;
  }, {});

module.exports = plugin.withOptions(() => {
  return ({ addBase, addUtilities }) => {
    const rootVars = {};

    const baseSize = Number(themeConfig.fonts.font_size.base);
    const scale = Number(themeConfig.fonts.font_size.scale);

    // Set font sizes
    const fontSizes = {
      base: `${baseSize}px`,
      "base-sm": `${baseSize * 0.8}px`,
      h1: `${scale ** 5}rem`,
      "h1-sm": `${scale ** 5 * 0.9}rem`,
      h2: `${scale ** 4}rem`,
      "h2-sm": `${scale ** 4 * 0.9}rem`,
      h3: `${scale ** 3}rem`,
      "h3-sm": `${scale ** 3 * 0.9}rem`,
      h4: `${scale ** 2}rem`,
      h5: `${scale}rem`,
      h6: `${scale}rem`,
    };
    Object.entries(fontSizes).forEach(([k, v]) => {
      rootVars[`--text-${k}`] = v;
    });

    Object.entries(fontFamilies).forEach(([key, font]) => {
      rootVars[`--font-${key}`] = font;
    });

    // Define color groups
    const groups = [
      { colors: themeConfig.colors.default.theme_color, prefix: "" },
      { colors: themeConfig.colors.default.text_color, prefix: "" },
      ...(themeConfig.colors.darkmode?.theme_color
        ? [
            {
              colors: themeConfig.colors.darkmode.theme_color,
              prefix: "darkmode-",
            },
          ]
        : []),
      ...(themeConfig.colors.darkmode?.text_color
        ? [
            {
              colors: themeConfig.colors.darkmode.text_color,
              prefix: "darkmode-",
            },
          ]
        : []),
    ];

    // Set color variables
    groups.forEach(({ colors, prefix }) => {
      Object.entries(colors).forEach(([k, v]) => {
        rootVars[`--color-${prefix}${k.replace(/_/g, "-")}`] = v;
      });
    });

    // Add variables to root
    addBase({ ":root": rootVars });

    // Generate color utilities
    const colorUtils = {};
    groups.forEach(({ colors, prefix }) => {
      Object.keys(colors).forEach((k) => {
        const cls = k.replace(/_/g, "-");
        const varRef = `var(--color-${prefix}${cls})`;
        colorUtils[`.bg-${prefix}${cls}`] = { backgroundColor: varRef };
        colorUtils[`.text-${prefix}${cls}`] = { color: varRef };
        colorUtils[`.border-${prefix}${cls}`] = { borderColor: varRef };
        colorUtils[`.fill-${prefix}${cls}`] = { fill: varRef };
        colorUtils[`.stroke-${prefix}${cls}`] = { stroke: varRef };
        colorUtils[`.from-${prefix}${cls}`] = {
          "--tw-gradient-from": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
          "--tw-gradient-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
        };
        colorUtils[`.to-${prefix}${cls}`] = {
          "--tw-gradient-to": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
          "--tw-gradient-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
        };
        colorUtils[`.via-${prefix}${cls}`] = {
          "--tw-gradient-via": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
        };
      });
    });

    // Generate font utilities dynamically
    const fontUtils = {};
    Object.keys(fontFamilies).forEach((key) => {
      fontUtils[`.font-${key}`] = { fontFamily: `var(--font-${key})` };
    });
    Object.keys(fontSizes).forEach((k) => {
      fontUtils[`.text-${k}`] = { fontSize: `var(--text-${k})` };
    });

    addUtilities(
      { ...colorUtils, ...fontUtils },
      { variants: ["responsive", "hover", "focus", "active", "disabled"] },
    );
  };
});
