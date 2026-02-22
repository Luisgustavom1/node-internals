const myIterator = {
  count: 0,
  next() {
    if (this.count >= 10) return { value: 11, done: true };
    return { value: ++this.count, done: false };
  },
  [Symbol.iterator]() {
    return this;
  },
};

const [a, b, c] = myIterator;
console.log(a, b, c);

for (const v of myIterator) {
  console.log(v);
}

console.log("\n=====\n")

const obj = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        i++;
        console.log("Returning", i);
        if (i === 3) return { done: true, value: i };
        return { done: false, value: i };
      },
      return() {
        console.log("Closing");
        return { done: true };
      },
    };
  },
};

const [x] = obj;
console.log(x)

const [y, z, w] = obj;
console.log(y, z, w);

console.log("\n=====\n")

const myIterableWithYield = {
  *[Symbol.iterator]() {
    yield 'a';
    yield 'b';
    yield 'c';
  },
}
for (const v of myIterableWithYield) {
  console.log(v);
}

console.log("\n=====\n")

// iterator is stateful, it remembers the current position in the sequence
function makeIterator(arr) {
  let idx = 0;
  return {
    next() {
      if (idx < arr.length) {
        return { value: arr[idx++], done: false };
      }

      return { done: true };
    }
  };
}

const foo = makeIterator(['x', 'y', 'z']);
console.log(foo.next());
console.log(foo.next());
console.log(foo.next());
console.log(foo.next());

console.log("\n=====\n")

const overrideSymbolWithGenerator = ['y', 'i', 'e', 'l', 'd'];
overrideSymbolWithGenerator[Symbol.iterator] = function* () {
  for (let i = 0; i < this.length; i++) {
    yield this[i];
  }
};

for (const v of overrideSymbolWithGenerator) {
  console.log(v);
}

console.log("\n=====\n")
const overrideSymbolWithNext = ['n', 'e', 'x', 't'];
overrideSymbolWithNext[Symbol.iterator] = function () {
  let i = 0;
  const arr = this;
  return {
    next() {
      if (i < arr.length) {
        return { value: arr[i++], done: false };
      }
      return { done: true };
    }
  };
};

for (const v of overrideSymbolWithNext) {
  console.log(v);
}
