#!/usr/bin/env node

import { Command, Option } from 'commander';
import parseFile from '../src/parse-filepath.js';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1');

program
  .addOption(
    new Option('-f, --format [type]', 'output format')
      .choices([
        'json',
        'plain',
      ])
      .default('plain'),
  );

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log('Hello, World!');
  });

program.parse();

const options = program.opts();
