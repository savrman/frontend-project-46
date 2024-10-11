const stringify = (value) => (typeof value !== 'object' || value === null) ? `'${value}'` : `[complex value]`;

const mapping = {
  deleted: (tree, path) => `Property '${[...path, tree.name].join('.')}' was removed`,
  added: (tree, path) => `Property '${[...path, tree.name].join('.')}' was added with value: ${stringify(tree.value)}`,
  changed: (tree, path) => `Property '${[...path, tree.name].join('.')}' was updated. From ${stringify(tree.oldValue)} to ${stringify(tree.value)}`,
};

const formatPlain = (tree) => {
  const iter = (tree, path) => {
    if (tree.type === 'root') {
      const lines = tree.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => iter(child, []));
      return [
        ...lines
      ].join('\n');
    }

    if (tree.type === 'nested') {
      const lines = tree.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => iter(child, [...path, tree.name]));
      return [
        ...lines
      ];
    }

    return mapping[tree.type](tree, path);
  };

  return iter(tree, 1);
};

export default formatPlain;
