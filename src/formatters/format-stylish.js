const REPLACER = ' ';
const INDENT_SIZE = 4;

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${REPLACER.repeat(INDENT_SIZE * (depth + 1))}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${REPLACER.repeat(INDENT_SIZE * depth)}}`,
  ].join('\n');
};

const mapping = {
  deleted: (data, depth) => `${REPLACER.repeat(INDENT_SIZE * depth - 2)}- ${data.key}: ${stringify(data.value, depth)}`,
  added: (data, depth) => `${REPLACER.repeat(INDENT_SIZE * depth - 2)}+ ${data.key}: ${stringify(data.value, depth)}`,
  unchanged: (data, depth) => `${REPLACER.repeat(INDENT_SIZE * depth - 2)}  ${data.key}: ${stringify(data.value, depth)}`,
  changed: (data, depth) => [
    mapping.deleted({ key: data.key, value: data.oldValue }, depth),
    mapping.added({ key: data.key, value: data.value }, depth),
  ].join('\n'),
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    if (node.type === 'root') {
      const lines = node.children
        .flatMap((child) => iter(child, depth));
      return [
        '{',
        ...lines,
        '}',
      ].join('\n');
    }

    if (node.type === 'nested') {
      const lines = node.children
        .flatMap((child) => iter(child, depth + 1));
      return [
        `${REPLACER.repeat(INDENT_SIZE * depth - 2)}  ${node.name}: {`,
        ...lines,
        `${REPLACER.repeat(INDENT_SIZE * depth)}}`,
      ];
    }

    return mapping[node.type]({
      key: node.name,
      value: node.value,
      oldValue: node.oldValue,
    }, depth);
  };

  return iter(tree, 1);
};

export default formatStylish;
