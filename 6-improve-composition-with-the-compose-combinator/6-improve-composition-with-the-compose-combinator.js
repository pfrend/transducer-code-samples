import {pushReducer, filter, map, evenOnly, doubleTheNumber} from "../utils";

const doubleMap = map(doubleTheNumber);
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

[1, 2, 3, 4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []);

// compose(f,g)(x) === f(g(x));
//
// compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer) ===
// isNot2Filter(isEvenFilter(doubleMap(pushReducer)));

const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(...args)), x => x);

[1, 2, 3, 4].reduce(
  compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer),
  [],
);
