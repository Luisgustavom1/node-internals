const async_hooks = require("node:async_hooks");
const { debug } = require("./debug.js");

const timers = new Map();

const ah = async_hooks.createHook({
	before: (asyncId) => {
		const start = process.hrtime.bigint();
		timers[asyncId] = start;
	},
	after: (asyncId) => {
		timers[asyncId] = process.hrtime.bigint() - timers[asyncId];
	}
})

ah.enable();


setTimeout(() => {}, 0)
setTimeout(() => {}, 10)
setTimeout(() => {}, 100)
setTimeout(() => {}, 1000)


process.on("beforeExit", () => {
	debug(timers);
	ah.disable();
}) 
