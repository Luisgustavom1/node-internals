const { createServer } = require('node:http');
const { executionAsyncId, executionAsyncResource, createHook } = require('node:async_hooks');
const { debug } = require("./debug.js");

const sym = Symbol('state');

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    debug(cr);
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  
  setTimeout(function() {
    res.end("state " + JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);
