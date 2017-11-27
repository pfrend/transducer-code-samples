const doubleTheNumber = number => number * 2;
[1,2,3,4].map(doubleTheNumber);

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number));
[1,2,3,4].map(doubleTwice);

const evenOnly = number => number % 2 === 0;

const doubleAndEven = number => doubleTheNumber(evenOnly(number));

const map = (xf, array) => {
    return array.reduce((accumulation, value) => {
        accumulation.push(xf(value));
        return accumulation;
    }, []);
}

map(doubleTheNumber, [1,2,3,4]);

const filter = (predicate, array) => {
    return array.reduce((accumulation, value) => {
        if (predicate(value)) accumulation.push(value);
        return accumulation;
    }, []);
};

filter(evenOnly, [1,2,3,4]);








