import {isPlainObject, isNumber} from 'lodash';
import {compose, map, filter, pushReducer} from '../utils';

//current transduce
const transduce = (xf /** could be composed **/, reducer, seed, collection) => {
    const transformedReducer = xf(reducer);
    let accumulation = seed;
    for (let value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }

    return accumulation;
};

const objectReducer = (obj, value) => Object.assign(obj, value);

const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
    else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
    throw new Error('into only supports arrays and objects as `to`');
};

into(
  [],
  compose(
    map(x => x/2),
    map(x => x * 10)
  ),
  [1,2,3,4],
);

into(
  {},
  compose(filter(isNumber), map(val => ({[val]: val}))),
  [1,2,3,4, 'hello', () => 'world'],
);