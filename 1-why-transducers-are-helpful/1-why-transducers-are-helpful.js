// arrayofRandoms :: Int -> Int -> [Int]
const arrayofRandoms = randomCeil => length =>
    Array.from({length: length}, (v, i) =>
        Math.floor(Math.random() * randomCeil));

const timeIt = (label, fn) => {
    console.time(label);
    fn();
    console.timeEnd(label);
};

const arrOfThousand = arrayofRandoms(100)(1000);
const arrOfMillion = arrayofRandoms(100)(1e6);

const isEven = val => val % 2 === 0;
const tripleIt = val => val * 3;

const resultFrom1000 = arrOfThousand
    .map(tripleIt)
    .filter(isEven);

timeIt('thousand - map', () => {
    const resultFrom1000 = arrOfThousand
        .map(tripleIt);
});

timeIt('thousand - map & filter', () => {
    const resultFrom1000 = arrOfThousand
        .map(tripleIt)
        .filter(isEven);
});

timeIt('million - map', () => {
    const resultFrom1000 = arrOfMillion
        .map(tripleIt);
});

timeIt('million - map & filter', () => {
    const resultFrom1000 = arrOfMillion
        .map(tripleIt) //[]
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