const fs = require('fs/promises');
const path = require('path');

const ensureDirectory = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const ensureFile = async (filePath, defaultContent = '[]') => {
  try {
    await fs.access(filePath);
  } catch {
    await ensureDirectory(path.dirname(filePath));
    await fs.writeFile(filePath, defaultContent, 'utf-8');
  }
};

module.exports = {
  ensureDirectory,
  ensureFile,
};


