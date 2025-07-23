const myPrime = require("./isPrime.js");
const fact = require("./factorial.js");
const operating = require("./osDetails.js");
let N = 5;
let prime = myPrime(N);
let factorial = fact(N);
console.log(N, prime);
console.log(factorial);
console.log(operating.length);
