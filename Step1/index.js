// TODO
// if there are same paramters with same fn -> and if this function calls more than once,
// retrieve cached value
// cache: key, value
// 1. make a variable of hash map()
// 2. when there is an args, stringify it and delcare as a key
// 3. put if statement to check there is a cache vale
// 4. else call a function and store the return value
export function memoize(fn) {
  let obj = {};
  return function (...args) {
    const key = JSON.stringify(...args);
    if (key in obj) {
      return obj[key];
    }

    const result = fn(...args);

    obj[key] = result;

    return result;
  };
}

let callCount = 0;
const memoizedFn = memoize((a, b) => {
  callCount += 1;
  return a + b;
});

memoizedFn(2, 3);
memoizedFn(2, 3);

console.log(callCount); // 1
