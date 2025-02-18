const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");
const themePath = path.join(__dirname, "../data/theme.json");
const themeRead = fs.readFileSync(themePath, "utf8");
const themeConfig = JSON.parse(themeRead);

// Helper to extract a clean font name.
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

// main plugin
module.exports = plugin.withOptions(() => {
  return ({ addBase, addUtilities }) => {
    const rootVars = {};

    // Parse base font size and scaling factor.
    const baseSize = Number(themeConfig.fonts.font_size.base);
    const scale = Number(themeConfig.fonts.font_size.scale);

    const calculateFontSizes = (base, scale) => {
      const sizes = {};
      let currentSize = scale;
      for (let i = 6; i >= 1; i--) {
        sizes[`h${i}`] = `${currentSize}rem`;
        sizes[`h${i}-sm`] = `${currentSize * 0.9}rem`;
        currentSize *= scale;
      }
      sizes.base = `${base}px`;
      sizes["base-sm"] = `${base * 0.8}px`;
      return sizes;
    };

    const fontSizes = calculateFontSizes(baseSize, scale);

    // Set font and text size variables.
    Object.entries(fontSizes).forEach(([key, value]) => {
      rootVars[`--text-${key}`] = value;
    });
    Object.entries(fontFamilies).forEach(([key, font]) => {
      rootVars[`--font-${key}`] = font;
    });

    // Define color groups.
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

    // Set color variables.
    groups.forEach(({ colors, prefix }) => {
      Object.entries(colors).forEach(([k, v]) => {
        const cssKey = k.replace(/_/g, "-");
        rootVars[`--color-${prefix}${cssKey}`] = v;
      });
    });

    // Add variables to root.
    addBase({ ":root": rootVars });

    const generateColorUtils = (colors, prefix) => {
      const utils = {};
      Object.keys(colors).forEach((k) => {
        const cls = k.replace(/_/g, "-");
        const varRef = `var(--color-${prefix}${cls})`;
        utils[`.bg-${prefix}${cls}`] = { backgroundColor: varRef };
        utils[`.text-${prefix}${cls}`] = { color: varRef };
        utils[`.border-${prefix}${cls}`] = { borderColor: varRef };
        utils[`.fill-${prefix}${cls}`] = { fill: varRef };
        utils[`.stroke-${prefix}${cls}`] = { stroke: varRef };
        utils[`.from-${prefix}${cls}`] = {
          "--tw-gradient-from": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
          "--tw-gradient-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
        };
        utils[`.to-${prefix}${cls}`] = {
          "--tw-gradient-to": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
          "--tw-gradient-stops":
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
        };
        utils[`.via-${prefix}${cls}`] = {
          "--tw-gradient-via": varRef,
          "--tw-gradient-via-stops":
            "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
        };
      });
      return utils;
    };

    const colorUtils = groups.reduce((acc, { colors, prefix }) => {
      return { ...acc, ...generateColorUtils(colors, prefix) };
    }, {});

    // Add font and text size utilities.
    const fontUtils = {};
    Object.keys(fontFamilies).forEach((key) => {
      fontUtils[`.font-${key}`] = { fontFamily: `var(--font-${key})` };
    });
    Object.keys(fontSizes).forEach((k) => {
      fontUtils[`.text-${k}`] = { fontSize: `var(--text-${k})` };
    });

    // Add the generated utilities with the desired variants.
    addUtilities(
      { ...colorUtils, ...fontUtils },
      { variants: ["responsive", "hover", "focus", "active", "disabled"] },
    );
  };
});
