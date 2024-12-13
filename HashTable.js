function merlinMap(size) {
  this._size = size;
  this._table = new Array(size);

  /**
   *
   * @param {string} key
   */
  this._hash = function (key) {
    let temp = 0;

    for (let i = 0; i < key.length; i++) {
      temp += key.charCodeAt(i);
    }

    const index = temp % this._size;

    return index;
  };
}

merlinMap.prototype.get = function (key) {
  const index = this._hash(key);

  return this._table[index];
};

merlinMap.prototype.set = function (key, value) {
  const index = this._hash(key);

  this._table[index] = value;
};

merlinMap.prototype.delete = function (key) {
  const index = this._hash(key);

  this._table[index] = undefined;
};

merlinMap.prototype.keys = function () {
  const tables = this._table;

  return tables.filter(Boolean);
};

const memo = (fn, size) => {
  const cache = new merlinMap(10);
  return function (...args) {
    const key = JSON.stringify(...args);
    const cacheHit = cache.get(key);

    if (cacheHit) {
      cache.delete(key);
      cache.set(key, cacheHit);
      return cacheHit;
    }

    const result = fn(...args);
    cache.set(key, result);
    const cacheLimit = cache.keys();

    if (cacheLimit > size) {
      const oldestKey = cacheLimit.shift();

      cache.delete(oldestKey);
    }

    return result;
  };
};

let callCount = 0;
const plusOne = (n) => {
  callCount += 1;
  console.log(callCount);
  return n + 1;
};

const memoization = memo(plusOne, 2);

memoization(2); // 1
memoization(3); // 2
memoization(4); // 3
memoization(2); // 3 -> 4

// lru -> least recentrly used

// (2) -> 4 -> 1
// (3) -> 3 -> 2
// (4) -> 2 -> 3
// (2) -> 1 -> 3
