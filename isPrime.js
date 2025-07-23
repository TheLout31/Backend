const p = require("is-even")

function isPrime(n) {
  if (n <= 1) {
    return "is not a prime Number";
  }

  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i == 0) {
      return "is not a prime Number";
    }
  }
  return "is a prime Number";
}

module.exports = isPrime;
