const genDiff = (data1, data2) => {
  const iter = (data1, data2) => {
    const keys = [data1, data2]
      .flatMap((item) => Object.keys(item))
      .filter((item, ix, arr) => arr.findIndex((val) => val === item) === ix)
      .toSorted();

    const diff = keys.reduce((arr, item) => {
      if (!Object.hasOwn(data1, item)) {
        arr[item] = 'added';
      } else if (!Object.hasOwn(data2, item)) {
        arr[item] = 'deleted';
      } else if (data1[item] !== data2[item]) {
        if (typeof data1[item] === 'object' && typeof data2[item] === 'object') {
          arr[item] = iter(data1[item], data2[item]);
        } else {
          arr[item] = 'changed';
        }
      } else {
        arr[item] = 'unchanged';
      }
      return arr;
    }, {});
    return diff;
  }
  return iter(data1, data2);
};

export default genDiff;
