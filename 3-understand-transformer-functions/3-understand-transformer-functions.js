const myString = 'hello';

myString.toUpperCase();

const toUpper = str => str.toUpperCase();

toUpper(myString);

const shout = str => `${str}!!`;

const scream = str => toUpper(shout(str));
shout('hello') === 'hello!!';

scream(myString);
