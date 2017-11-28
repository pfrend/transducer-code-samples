import {isPlainObject} from 'lodash';
import {compose, map, arrayReducer, objectReducer, transduce} from '../utils.js';

const into = (to, xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, arrayReducer, to, collection);
  else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
  throw new Error('into only supports arrays and objects as `to`');
};

const seq = (xf, collection) => {
  if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
  throw new Error('unsupported collection type');
};

seq(map(x => x*2), [1,2,3]);

const flip = compose(
  map(([k,v]) => ({[v*10]:k})),
);

seq(flip, {one: 1, two: 2, three: 3});
