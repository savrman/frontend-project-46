const isObject = (value) => (typeof value === 'object' && value !== null);

const genDiff = (obj1, obj2) => {
  const iter = (data1, data2) => {
    const keys = [...new Set([
      ...Object.getOwnPropertyNames(data1),
      ...Object.getOwnPropertyNames(data2),
    ])].toSorted();

    const diff = keys.map((key) => {
      if (isObject(data1[key]) && isObject(data2[key])) {
        return {
          name: key,
          type: 'nested',
          children: iter(data1[key], data2[key]),
        };
      }
      if (!Object.hasOwn(data1, key)) {
        return {
          name: key,
          type: 'added',
          value: data2[key],
        };
      }
      if (!Object.hasOwn(data2, key)) {
        return {
          name: key,
          type: 'deleted',
          value: data1[key],
        };
      }
      if (data1[key] !== data2[key]) {
        return {
          name: key,
          type: 'changed',
          oldValue: data1[key],
          value: data2[key],
        };
      }
      return {
        name: key,
        type: 'unchanged',
        value: data2[key],
      };
    });
    return diff;
  };
  return {
    type: 'root',
    children: iter(obj1, obj2),
  };
};

export default genDiff;
