export const deepEqual = (
  obj1: any,
  obj2: any,
  cache = new WeakMap()
): boolean => {
  const isSameValue = obj1 === obj2;
  if (isSameValue) {
    return true;
  }

  const isSameType = typeof obj1 === typeof obj2;
  if (!isSameType) {
    return false;
  }

  const isEitherNull = obj1 === null || obj2 === null;
  if (isEitherNull) {
    return false;
  }

  const isEitherObject = typeof obj1 === 'object' && typeof obj2 === 'object';
  if (!isEitherObject) {
    return false;
  }

  const isCircularReference = cache.has(obj1) && cache.get(obj1) === obj2;
  if (isCircularReference) {
    return true;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const isSameLength = obj1Keys.length === obj2Keys.length;
  if (!isSameLength) {
    return false;
  }

  const obj2KeysSet = new Set(obj2Keys);
  cache.set(obj1, obj2);

  for (const key of obj1Keys) {
    if (!obj2KeysSet.has(key) || !deepEqual(obj1[key], obj2[key], cache)) {
      return false;
    }
  }

  return true;
};
