const log = {};
const cache = {};

export function fibonacci(n) {
  log[n] = log[n] + 1 || 1;

  if (n < 2) {
    return n;
  }
  cache[n] = cache[n] || fibonacci(n - 1) + fibonacci(n - 2);

  return cache[n];
}

Object.entries(log)
  .reverse()
  .forEach(([n, times]) => {
    console.log(`fib(${n}) was called ${times} times`);
  });
