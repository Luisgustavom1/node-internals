function* foo() {
  var index = 0;
  while (index <= 2) yield index++;
}

var iterator = foo();
console.log(iterator.next());
console.log(iterator.next()); 
console.log(iterator.next());
console.log(iterator.next()); 

const genObject = (function* () {
  yield 1;
  yield 2;
  yield 3;
})();

console.log("\n=====\n");

console.log(typeof genObject.next);

console.log(typeof genObject[Symbol.iterator]);

console.log("symbol iterator return this", genObject[Symbol.iterator]() === genObject);

console.log("\n=====\n");

function* generator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const gen = generator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log("\n=====\n");

function* idMaker() {
  let id = 0;
  while(true) yield ++id;
}

const idGen = idMaker();

const getId = () => idGen.next().value;

console.log(getId());
console.log(getId());
console.log(getId());

console.log("\n=====\n");

class Foo {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
}

const MyObj = {
  *[Symbol.iterator]() {
    yield 'a';
    yield 'b';
  }
}

console.log(Array.from(new Foo()));
console.log(Array.from(MyObj));

console.log("\n=====\n");

function* count(n) {
  for (let current = 1; ; current++) {
    if (current > n) break;
    yield current;
  }
}

for (const counter of count(6)) { console.log(counter) }









