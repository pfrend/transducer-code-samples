import {isPlainObject, entries} from 'lodash';

export const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

export const arrayofRandoms = randomCeil => length =>
  Array.from({length: length}, (v, i) =>
    Math.floor(Math.random() * randomCeil));

export const compose = (...functions) =>
    functions.reduce((accumulation, fn) =>
        (...args) => accumulation(fn(...args)), x => x);

export const map = xf => reducer => {
    return (accumulation, value) => {
        return reducer(accumulation, xf(value));
    };
};

export const filter = predicate => reducer => {
    return (accumulation, value) => {
        if (predicate(value)) return reducer(accumulation, value);
        return accumulation;
    };
};

export const evenOnly = number => number % 2 === 0;
export const doubleTheNumber = number => number * 2;
export const doubleAndEven = compose(map(doubleTheNumber), filter(evenOnly));
export const pushReducer = (accumulation, value) => {
    accumulation.push(value);
    return accumulation;
};
export const toUpper = str => str.toUpperCase();
export const shout = str => `${str}!!`;
export const scream = str => toUpper(shout(str));

export const arrayReducer = (array, value) => {
    array.push(value);
    return array;
};

// and our object reducer will perform a shallow merge with object.assign.
export const objectReducer = (obj, value) => Object.assign(obj, value);

export const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, arrayReducer, to, collection);
    else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
    throw new Error('into only supports arrays and objects as `to`');
};

export const transduce = (xf /** could be composed **/, reducer, seed, _collection) => {

    // apply our reducer transform
    const transformedReducer = xf(reducer);
    // for every value, send the current value and the new total in, function returns a new total
    let accumulation = seed;

    const collection = isPlainObject(_collection) ? entries(_collection) : _collection;

    for (let value of collection) {
        accumulation = transformedReducer(accumulation, value); /*?*/
    }

    return accumulation;
};

export const seq = (xf, collection) => {
    if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
    // and for an object it will be an empty object
    else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
    else if (collection['@@transducer/step']) {
        const init = collection['@@transducer/init'] ? collection['@@transducer/init']() : collection.constructor();
        return transduce(xf, collection['@@transducer/step'], init, collection);

    }
    throw new Error('unsupported data type');
};
