#!/usr/bin/env node

import { Command, Option } from 'commander';
import genDiff from "../index.js";
import formatStylish from '../src/formatters/format-stylish.js';
import formatPlain from '../src/formatters/format-plain.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1');

program
  .addOption(
    new Option('-f, --format [type]', 'output format')
      .choices([
        'stylish',
        'plain',
      ])
      .default('stylish'),
  );

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2);
    const mapFormat = {
      stylish: formatStylish,
      plain: formatPlain,
      json: '',
    };
    const result = mapFormat[options.format](diff);
    console.log(result);
  });

program.parse();

const options = program.opts();
