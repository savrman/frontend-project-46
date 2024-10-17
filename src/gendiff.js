const genDiff = (obj1, obj2) => {
  const iter = (data1, data2) => {
    const isObject = (value) => (typeof value === 'object' && value !== null);

    const keys = [...new Set([
      ...Object.getOwnPropertyNames(data1),
      ...Object.getOwnPropertyNames(data2),
    ])].toSorted();

    const diff = keys.reduce((arr, item) => {
      if (isObject(data1[item]) && isObject(data2[item])) {
        arr.push({
          name: item,
          type: 'nested',
          children: iter(data1[item], data2[item]),
        });
      } else if (!Object.hasOwn(data1, item)) {
        arr.push({
          name: item,
          type: 'added',
          value: data2[item],
        });
      } else if (!Object.hasOwn(data2, item)) {
        arr.push({
          name: item,
          type: 'deleted',
          value: data1[item],
        });
      } else if (data1[item] !== data2[item]) {
        arr.push({
          name: item,
          type: 'changed',
          oldValue: data1[item],
          value: data2[item],
        });
      } else {
        arr.push({
          name: item,
          type: 'unchanged',
          value: data2[item],
        });
      }
      return arr;
    }, []);
    return diff;
  };
  return {
    type: 'root',
    children: iter(obj1, obj2),
  };
};

export default genDiff;
