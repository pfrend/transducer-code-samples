import {doubleTheNumber, evenOnly, pushReducer, map, shout, compose, filter} from '../utils';

const doubleMap = map(doubleTheNumber);
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);

[1, 2, 3, 4].reduce(
  compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer),
  [],
);

const transduce = (xf, reducer, seed, collection) => {
  const transformedReducer = xf(reducer);
  let accumulation = seed;
  for (const value of collection) {
    accumulation = transformedReducer(accumulation, value);
  }

  return accumulation;
}

const toUpper = str => str.toUpperCase();
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());

transduce(
  compose(map(toUpper), filter(isVowel)),
  (str, char) => str + char,
  '',
  'adrian',
); 

const numMap = new Map();
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);

transduce(
  compose(isNot2Filter, isEvenFilter, doubleMap),
  pushReducer,
  [],
  numMap.values(),
);

