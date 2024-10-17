const REPLACER = ' ';
const INDENT_SIZE = 4;

const indent = (depth, trimSize = 0) => REPLACER.repeat(INDENT_SIZE * depth - trimSize);
const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${indent(depth)}}`,
  ].join('\n');
};

const mapping = {
  root: (node, depth) => {
    const lines = node.children
      .flatMap((child) => mapping[child.type](child, depth));
    return [
      '{',
      ...lines,
      '}',
    ].join('\n');
  },
  nested: (node, depth) => {
    const lines = node.children
      .flatMap((child) => mapping[child.type](child, depth + 1));
    return [
      `${indent(depth, 2)}  ${node.name}: {`,
      ...lines,
      `${indent(depth)}}`,
    ];
  },
  deleted: (node, depth) => `${indent(depth, 2)}- ${node.name}: ${stringify(node.value, depth)}`,
  added: (node, depth) => `${indent(depth, 2)}+ ${node.name}: ${stringify(node.value, depth)}`,
  unchanged: (node, depth) => `${indent(depth, 2)}  ${node.name}: ${stringify(node.value, depth)}`,
  changed: (node, depth) => [
    mapping.deleted({ ...node, value: node.oldValue }, depth),
    mapping.added(node, depth),
  ].join('\n'),
};

const formatStylish = (tree) => mapping[tree.type](tree, 1);

export default formatStylish;
