import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const getAbsolutePath = (filePath) => {
  if (path.isAbsolute(filePath)) return filePath;
  const currentWorkingDirectory = cwd();
  return path.resolve(currentWorkingDirectory, filePath);
};

const getFilepathInfo = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const isExists = fs.existsSync(absolutePath);
  if (!isExists) throw new Error(`${filePath} no such file.`);
  const isDirectory = fs.lstatSync(absolutePath).isDirectory();
  if (isDirectory) throw new Error(`${filePath} is directory. Please provide file path.`);
  const extension = path.extname(absolutePath).split('.').at(-1);

  return {
    originalPath: filePath,
    absolutePath,
    extension,
  };
};

const getFileData = (filePath) => fs.readFileSync(filePath);

export { getAbsolutePath, getFilepathInfo, getFileData };
