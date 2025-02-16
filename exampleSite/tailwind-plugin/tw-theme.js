const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");
const themePath = path.join(__dirname, "../data/theme.json");
const themeRead = fs.readFileSync(themePath, "utf8");
const themeConfig = JSON.parse(themeRead);

const findFont = (fontStr) =>
  fontStr.replace(/\+/g, " ").replace(/:[^:]+/g, "");

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

    // Set font families
    rootVars["--font-primary"] =
      `${findFont(themeConfig.fonts.font_family.primary)}, ${themeConfig.fonts.font_family.primary_type}`;
    rootVars["--font-secondary"] =
      `${findFont(themeConfig.fonts.font_family.secondary)}, ${themeConfig.fonts.font_family.secondary_type}`;

    // Define color groups
    const groups = [
      { colors: themeConfig.colors.default.theme_color, prefix: "" },
      { colors: themeConfig.colors.default.text_color, prefix: "" },
      {
        colors: themeConfig.colors.darkmode.theme_color,
        prefix: "darkmode-",
      },
      { colors: themeConfig.colors.darkmode.text_color, prefix: "darkmode-" },
    ];

    // Set color variables
    groups.forEach(({ colors, prefix }) => {
      Object.entries(colors).forEach(([k, v]) => {
        rootVars[`--color-${prefix}${k.replace(/_/g, "-")}`] = v;
      });
    });

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
        colorUtils[`.from-${prefix}${cls}`] = {
          "--tw-gradient-from": varRef,
        };
        colorUtils[`.to-${prefix}${cls}`] = { "--tw-gradient-to": varRef };
        colorUtils[`.via-${prefix}${cls}`] = {
          "--tw-gradient-stops": varRef,
        };
      });
    });

    // Generate font utilities
    const fontUtils = {
      ".font-primary": { fontFamily: "var(--font-primary)" },
      ".font-secondary": { fontFamily: "var(--font-secondary)" },
    };
    Object.keys(fontSizes).forEach((k) => {
      fontUtils[`.text-${k}`] = { fontSize: `var(--text-${k})` };
    });

    addUtilities(
      { ...colorUtils, ...fontUtils },
      { variants: ["responsive", "hover", "focus", "active", "disabled"] },
    );
  };
});
