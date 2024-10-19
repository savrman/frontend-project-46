import path, { dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (pathList) => path.join(__dirname, '..', '__fixtures__', ...pathList);

const deepTypes = ['flat', 'nested'];
const fileExtensions = ['json', 'yml'];

describe.each(deepTypes)('Deep %s', (deepType) => {
  describe.each(fileExtensions)('File extension %s', (fileExtension) => {
    test.each(['json', 'plain', 'stylish'])('Format %s', (format) => {
      const fixturePath1 = getFixturePath([deepType, `file1.${fileExtension}`]);
      const fixturePath2 = getFixturePath([deepType, `file2.${fileExtension}`]);
      const expected = fs.readFileSync(getFixturePath([deepType, `expected-file1-file2-${format}`]), 'utf-8');
      expect(genDiff(fixturePath1, fixturePath2, format)).toEqual(expected);
    });
  });
});
