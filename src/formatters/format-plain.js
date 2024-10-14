const stringify = (value) => ((typeof value !== 'object' || value === null) ? `'${value}'` : '[complex value]');

const mapping = {
  deleted: (tree, path) => `Property '${[...path, tree.name].join('.')}' was removed`,
  added: (tree, path) => `Property '${[...path, tree.name].join('.')}' was added with value: ${stringify(tree.value)}`,
  changed: (tree, path) => `Property '${[...path, tree.name].join('.')}' was updated. From ${stringify(tree.oldValue)} to ${stringify(tree.value)}`,
};

const formatPlain = (tree) => {
  const iter = (node, path) => {
    if (node.type === 'root') {
      const lines = node.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => iter(child, []));
      return [
        ...lines,
      ].join('\n');
    }

    if (node.type === 'nested') {
      const lines = node.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => iter(child, [...path, node.name]));
      return [
        ...lines,
      ];
    }

    return mapping[node.type](node, path);
  };

  return iter(tree, 1);
};

export default formatPlain;
