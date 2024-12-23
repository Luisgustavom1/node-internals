const async_hooks = require('node:async_hooks');
const net = require('node:net');
const { debug } = require('./debug.js');

let indent = 0;

async_hooks.createHook({
	init(asyncId, type, triggerAsyncId) {
		const eid = async_hooks.executionAsyncId();
		const indentStr = ' '.repeat(indent);

		debug(`${indentStr}${type}(${asyncId}):` + ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
	},
	before(asyncId) {
		const indentStr = ' '.repeat(indent);
    		debug(`${indentStr}before:  ${asyncId}\n`);
    		indent += 2;
	},
	 after(asyncId) {
    		indent -= 2;
    		const indentStr = ' '.repeat(indent);
    		debug(`${indentStr}after:  ${asyncId}\n`);
  	},
  	destroy(asyncId) {
    		const indentStr = ' '.repeat(indent);
    		debug(`${indentStr}destroy:  ${asyncId}\n`);
  	},
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // Let's wait 10ms before logging the server started.
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});
