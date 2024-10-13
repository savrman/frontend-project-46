import formatStylish from "./format-stylish.js";
import formatPlain from "./format-plain.js";
import formatJson from "./format-json.js";

export default (data, formatName) => {
  const mapFormat = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,
  };
  return mapFormat[formatName](data);
};
