import path, { dirname } from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (...paths) => path.join(__dirname, '..', '__fixtures__', ...paths);

test('Parse unknown file extension', () => {
  const unknownFileExtension = 'unknwn';
  expect(() => parse('', unknownFileExtension)).toThrow(new Error(`${unknownFileExtension} extension is not supported.`));
});

test('Same output for YAML/YML file extensions', () => {
  const fixtureDataYml = fs.readFileSync(getFixturePath('flat', 'file1.yml'));
  expect(parse(fixtureDataYml, 'yml')).toEqual(parse(fixtureDataYml, 'yaml'));
});
