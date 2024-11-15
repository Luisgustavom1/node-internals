const async_hooks = require('node:async_hooks');
const { debug } = require("./debug.js");

// current execution context id
const eid = async_hooks.executionAsyncId();

// id of the handle that trigger the cb of the current execution scope
const tid = async_hooks.triggerAsyncId();

debug(`current execution context id ${eid}`)
debug(`handler id ${tid}`)

const cbs = { init, before, after, destroy, promiseResolve }
const asyncHook = async_hooks.createHook(cbs).enable();

// init() is called during object construction.
// the resource may not have completed. Thus, fields may be optional
function init(asyncId, type, triggerAsyncId, _resource) { 
	debug(asyncId, type, triggerAsyncId) 
}

// before() is called just before the resource's callback is called. It can be
// called 0-N times for handles (such as TCPWrap), and will be called exactly 1
// time for requests (such as FSReqCallback).
function before(asyncId) { debug(asyncId) }

// after() is called just after the resource's callback has finished.
function after(asyncId) { }

// destroy() is called when the resource is destroyed.
function destroy(asyncId) { }

// promiseResolve() is called only for promise resources, when the
// resolve() function passed to the Promise constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { }

clearTimeout(setTimeout(() => {}, 10));
