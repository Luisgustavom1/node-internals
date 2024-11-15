const { createHook, executionAsyncId, triggerAsyncId } = require("node:async_hooks");
const net = require("node:net");
const { debug } = require("./debug.js");

const execid = executionAsyncId();
const tid = triggerAsyncId();

debug(`executionAsyncId (${execid})\ntriggerAsyncId (${tid})\n`);

createHook({
	init(asyncId, type, triggerAsyncId) {
		const eid = executionAsyncId();
		debug(`${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
	}
}).enable();

net.createServer(conn => {}).listen(8080);
