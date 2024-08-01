const add = require("./calculator");

console.log(add(10,15))


// multi functions import 


const calculator = require("./calculator");

const {abb,sub} = calculator;

console.log(add(1,2));
console.log(sub(2,2));
