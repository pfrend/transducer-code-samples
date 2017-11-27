import {isPlainObject, entries} from 'lodash';
import {map, into} from '../utils';

let transduce = (xf /** could be composed **/, reducer, seed, _collection) => {

    const transformedReducer = xf(reducer);
    let accumulation = seed;

    const collection = isPlainObject(_collection) ? entries(_collection) : _collection;

    for (let value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }

    return accumulation;
};

const objectValues = obj => {
    return into([], map(kv => kv[1]), obj);
};

objectValues({one: 1, two: 2});