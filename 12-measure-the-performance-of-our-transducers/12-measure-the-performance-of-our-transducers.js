import {seq, compose, map, filter, timeIt, arrayofRandoms} from "../utils";
import t from 'transducers.js';

const isEven = val => val % 2 === 0;
const tripleIt = val => val * 3;
const arrOfMillion = arrayofRandoms(100)(1e6);

timeIt('million - chained', () => {
  arrOfMillion
    .map(tripleIt)
    .filter(isEven);
});
timeIt('million - chained x2', () => {
  arrOfMillion
    .map(tripleIt)
    .map(tripleIt)
    .filter(isEven);
});
timeIt('million - chained x4', () => {
  arrOfMillion
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
    .filter(isEven);
});

timeIt('million - imperative', () => {
  const result = [];
  arrOfMillion
    .forEach(val => {
      const tripled = tripleIt(val);
      if (isEven(tripled)) result.push(tripled);
    });
});

timeIt('million - transduce', () => {
 seq(
   compose(
     map(tripleIt),
     filter(isEven),
   ),
   arrOfMillion,
 );
});

timeIt('million - transduce x2', () => {
  seq(
    compose(
      map(tripleIt),
      map(tripleIt),
      filter(isEven),
    ),
    arrOfMillion,
  );
});

timeIt('million - transduce x4', () => {
  seq(
    compose(
      map(tripleIt),
      map(tripleIt),
      map(tripleIt),
      map(tripleIt),
      filter(isEven),
    ),
    arrOfMillion,
  );
});

timeIt('million - transduce lib', () => {
  t.seq(
    arrOfMillion,
    t.compose(
      t.map(tripleIt),
      t.map(tripleIt),
      t.map(tripleIt),
      t.map(tripleIt),
      t.filter(isEven),
    ),
  );
});
