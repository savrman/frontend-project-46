const genDiff = (obj1, obj2) => {
  const iter = (data1, data2) => {
    const keys = [data1, data2]
      .flatMap((item) => Object.keys(item))
      .filter((item, ix, arr) => arr.findIndex((val) => val === item) === ix)
      .toSorted();

    const diff = keys.reduce((arr, item) => {
      if (typeof data1[item] === 'object' && typeof data2[item] === 'object') {
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
    children: [
      ...iter(obj1, obj2),
    ],
  };
};

export default genDiff;
