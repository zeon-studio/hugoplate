const fs = require("fs");
const path = require("path");

const createNewfolder = (rootfolder, folderName) => {
  const newFolder = path.join(rootfolder, folderName);
  fs.mkdirSync(newFolder, { recursive: true });
  return newFolder;
};

const deleteFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }
};

const getFolderName = (rootfolder) => {
  const configPath = path.join(
    rootfolder,
    "exampleSite/config/_default/hugo.toml"
  );
  const getConfig = fs.readFileSync(configPath, "utf8");
  const match = getConfig.match(/theme\s*=\s*\[?"([^"\]]+)"\]?/);
  let selectedTheme = null;
  if (match && match[1]) {
    selectedTheme = match[1];
  }
  return selectedTheme;
};

const iterateFilesAndFolders = (rootFolder, { destinationRoot }) => {
  const directory = path.join(rootFolder);
  const items = fs.readdirSync(directory, { withFileTypes: true });
  items.forEach((item) => {
    if (item.isDirectory()) {
      createNewfolder(destinationRoot, item.name);
      iterateFilesAndFolders(path.join(directory, item.name), {
        currentFolder: item.name,
        destinationRoot: path.join(destinationRoot, item.name),
      });
    } else {
      const sourceFile = path.join(directory, item.name);
      const destinationFile = path.join(destinationRoot, item.name);
      fs.renameSync(sourceFile, destinationFile);
    }
  });
};

const setupTheme = () => {
  const rootFolder = path.join(__dirname, "../");

  if (!fs.existsSync(path.join(rootFolder, "exampleSite"))) {
    const includesFiles = [
      "tailwind.config.js",
      "postcss.config.js",
      "go.mod",
      "hugo.toml",
      "assets",
      "config",
      "data",
      "content",
      "i18n",
      "static",
    ];

    const folder = createNewfolder(rootFolder, "exampleSite");

    fs.readdirSync(rootFolder, { withFileTypes: true }).forEach((file) => {
      if (includesFiles.includes(file.name)) {
        if (file.isDirectory()) {
          const destination = path.join(rootFolder, "exampleSite", file.name);
          fs.mkdirSync(destination, { recursive: true });
          iterateFilesAndFolders(path.join(rootFolder, file.name), {
            destinationRoot: destination,
          });
          deleteFolder(path.join(rootFolder, file.name));
        } else {
          fs.renameSync(
            path.join(rootFolder, file.name),
            path.join(folder, file.name)
          );
        }
      }
    });

    const themes = path.join(rootFolder, "themes");
    iterateFilesAndFolders(path.join(themes, getFolderName(rootFolder)), {
      destinationRoot: rootFolder,
    });
    deleteFolder(themes);
  }
};

setupTheme();
