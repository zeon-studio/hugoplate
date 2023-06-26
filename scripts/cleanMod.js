const fs = require("fs");

const clearMode = (filePath) => {
  if (fs.existsSync(filePath)) {
    let fileContent = fs.readFileSync(filePath, "utf8");
    fileContent = fileContent.replace(/require\s*\([\s\S]*?\)/, "");
    fs.writeFileSync(filePath, fileContent, "utf8");
  } else {
    console.log("File does not exist.");
  }
};

clearMode("go.mod");
clearMode("exampleSite/go.mod");
