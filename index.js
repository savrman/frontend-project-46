import genDiff from "./src/gendiff.js";
import parse from "./src/parsers.js";
import { getFilepathInfo, getFileData } from "./src/fs-helper.js";
import format from "./src/formatters/index.js";

export default (filepath1, filepath2, formatName) => {
  const fileInfo1 = getFilepathInfo(filepath1);
  const fileInfo2 = getFilepathInfo(filepath2);
  const data1 = getFileData(fileInfo1.absolutePath);
  const data2 = getFileData(fileInfo2.absolutePath);
  const diffTree = genDiff(parse(data1, fileInfo1.extension), parse(data2, fileInfo2.extension));
  return format(diffTree, formatName);
};
