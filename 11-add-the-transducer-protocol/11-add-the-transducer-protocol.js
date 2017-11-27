/**
 * LESSON: transduce over Immutable.js collections
 * - show how map and filter works with Immutable.List
 * - can't use seq as it can only handle arrays and objects, but we CAN use our transduce fn
 * - forced to call .fromJS to create a new Immutable.List after transduce finished.
 * - now we can unwrap anything, but not wrap it back up without saying how.
 * - add the ability for the data structure to say 'how'.
 * - implement protocol so that we can use seq with any structure
 */

import {compose, transduce, objectReducer, arrayReducer, map, filter, doubleTheNumber, evenOnly} from "../utils";
import {fromJS,List} from 'immutable';
import {isPlainObject} from 'lodash';

const doubleAndEven = compose(map(doubleTheNumber), filter(evenOnly));

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

into([], doubleAndEven, List([1,2,3,4]));
// into(List(), doubleAndEven, [1, 2, 3, 4]);
// seq(doubleAndEven, List([1, 2, 3, 4]));
