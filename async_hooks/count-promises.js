const async_hooks = require("node:async_hooks");

let promisesCount = 0;

async_hooks.createHook({
	init(asyncId, type, triggerAsyncId) {
		if (type === "PROMISE") promisesCount++;
	}
}).enable();

const fn = () => {}
const functions = [fn, fn, fn];

functions.reduce(
	async (acc, f) => await f(await acc),
	Promise.resolve(1)
) // 13

functions.reduce(
	(acc, f) => acc.then(f),
	Promise.resolve(1)
) // 4

process.on('beforeExit', () => {
	console.log(`promises created: ${promisesCount}`)
})
