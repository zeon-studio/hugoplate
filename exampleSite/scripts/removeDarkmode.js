const fs = require("fs");
const path = require("path");

const rootDirs = [
  "themes/iot-hub-docs/assets/scss",
  "themes/iot-hub-docs/layouts",
];
const configFiles = [
  {
    filePath: "tailwind.config.js",
    patterns: ["darkmode:\\s*{[^}]*},", 'darkMode:\\s*"class",'],
  },
  {
    filePath: "config.toml",
    patterns: ["\\S*\\.darkmode[^\\]]*\\]\\n*([\\s\\S]*?)(?=\\[|$)"],
  },
];

rootDirs.forEach(removeDarkModeFromPages);
configFiles.forEach(removeDarkMode);

function removeDarkModeFromFiles(filePath, regexPatterns) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  let updatedContent = fileContent;
  regexPatterns.forEach((pattern) => {
    const regex = new RegExp(pattern, "g");
    updatedContent = updatedContent.replace(regex, "");
  });
  fs.writeFileSync(filePath, updatedContent, "utf8");
}

function removeDarkModeFromPages(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      removeDarkModeFromPages(filePath);
    } else if (stats.isFile()) {
      removeDarkModeFromFiles(filePath, [
        '(?:(?!["])\\S)*dark:(?:(?![,;"])\\S)*',
        "@apply?(\\s)*;",
      ]);
    }
  });
}

function removeDarkMode(configFile) {
  const { filePath, patterns } = configFile;
  removeDarkModeFromFiles(filePath, patterns);
}
