import fs from "node:fs";
import path from "node:path";

// Paths
const notFoundPage = "layouts/404.en.html";
const menusPath = "exampleSite/config/_default/menus.en.toml";
const languagesPath = "exampleSite/config/_default/languages.toml";
const hugoConfigPath = "exampleSite/hugo.toml";
const developmentDir = "exampleSite/config/development";
const i18nDir = "exampleSite/i18n";
const englishContentDir = "exampleSite/content/english";
const targetContentDir = "exampleSite/content";

// Helper function to remove directory recursively
const removeDirRecursive = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ Removed directory: ${dirPath}`);
  } else {
    console.log(`✗ Directory not found: ${dirPath}`);
  }
};

// Helper function to remove file
const removeFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ Removed file: ${filePath}`);
  } else {
    console.log(`✗ File not found: ${filePath}`);
  }
};

// Helper function to rename file
const renameFile = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${oldPath} → ${newPath}`);
  } else {
    console.log(`✗ File not found: ${oldPath}`);
  }
};

// Helper function to move directory contents
const moveDirContents = (sourceDir, targetDir) => {
  if (!fs.existsSync(sourceDir)) {
    console.log(`✗ Source directory not found: ${sourceDir}`);
    return;
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const items = fs.readdirSync(sourceDir);

  items.forEach((item) => {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    fs.renameSync(sourcePath, targetPath);
    console.log(`✓ Moved: ${sourcePath} → ${targetPath}`);
  });

  // Remove the now-empty source directory
  fs.rmdirSync(sourceDir);
  console.log(`✓ Removed empty directory: ${sourceDir}`);
};

// Main function
const removeMultilang = () => {
  console.log("Starting multilanguage removal process...\n");

  // 1. Remove exampleSite/config/development folder
  console.log("1. Removing development folder...");
  removeDirRecursive(developmentDir);
  console.log("");

  // 2. Remove exampleSite/i18n folder
  console.log("2. Removing i18n folder...");
  removeDirRecursive(i18nDir);
  console.log("");

  // 3. Remove languagesPath file
  console.log("3. Removing languages.toml file...");
  removeFile(languagesPath);
  console.log("");

  // 4. Rename menusPath and notFoundPage
  console.log("4. Renaming files (removing .en)...");
  renameFile(menusPath, menusPath.replace(".en.", "."));
  renameFile(notFoundPage, notFoundPage.replace(".en.", "."));
  console.log("");

  // 5. Remove language configuration from hugo.toml
  console.log("5. Updating hugo.toml...");
  if (fs.existsSync(hugoConfigPath)) {
    let hugoConfig = fs.readFileSync(hugoConfigPath, "utf-8");

    // Remove the language configuration block
    const languageConfigRegex =
      /# disable language\ndisableLanguages = \[\n\].*?defaultContentLanguageInSubdir = false\n/s;
    hugoConfig = hugoConfig.replace(languageConfigRegex, "");

    fs.writeFileSync(hugoConfigPath, hugoConfig);
    console.log(`✓ Updated: ${hugoConfigPath}`);
  } else {
    console.log(`✗ File not found: ${hugoConfigPath}`);
  }
  console.log("");

  // 6. Move all folders and files from exampleSite/content/english to exampleSite/content
  console.log("6. Moving content from english folder to content folder...");
  moveDirContents(englishContentDir, targetContentDir);
  console.log("");

  console.log("✓ Multilanguage removal completed successfully!");
};

// Run the script
removeMultilang();
