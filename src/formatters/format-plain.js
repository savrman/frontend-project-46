const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value !== 'object' || value === null) return `${value}`;
  return '[complex value]';
};

const mapping = {
  root: (tree, path) => {
    const lines = tree.children
      .flatMap((child) => mapping[child.type](child, path))
      .filter((child) => child !== '');
    return lines.join('\n');
  },
  nested: (tree, path) => {
    const lines = tree.children
      .flatMap((child) => mapping[child.type](child, [...path, tree.name]));
    return lines;
  },
  deleted: (tree, path) => `Property '${[...path, tree.name].join('.')}' was removed`,
  added: (tree, path) => `Property '${[...path, tree.name].join('.')}' was added with value: ${stringify(tree.value)}`,
  changed: (tree, path) => `Property '${[...path, tree.name].join('.')}' was updated. From ${stringify(tree.oldValue)} to ${stringify(tree.value)}`,
  unchanged: (tree, path) => '',
};

const formatPlain = (tree) => mapping[tree.type](tree, []);

export default formatPlain;
