import yaml from 'js-yaml';

export default (data, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`${ext} extension is not supported.`);
  }
};
