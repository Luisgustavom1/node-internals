const http = require("node:http");
const { executionAsyncId, executionAsyncResource, createHook } = require('node:async_hooks');
const { debug: originalDebug } = require("./debug.js"); 
const crypto = require("crypto");

const kResourceStore = Symbol('kResourceStore');

createHook({
	init(_asyncId, _type, _triggerId, resource) {
		// propagating resource store to new init resource
		const currentResource = executionAsyncResource();
		resource[kResourceStore] = currentResource[kResourceStore];	
	}
}).enable();

const debug = (msg) => {
	const resource = executionAsyncResource();
	originalDebug(`${resource[kResourceStore]?.cid || "N"} - ${msg}`);
}

const routes = async (url, body) => {
	switch (url) {
		case "/":
			someSlowWork(body);
		case "/uai":
			await someAsyncWork(body);
	}
}

function someSlowWork(body) {
	debug(`prcoessing sync work ${body}`);
	for (let i = 0; i < 1000000; i++) {}
	debug(`successfully ${body}`);
}

async function someAsyncWork(body) {
	debug(`processing async work ${body}`);
	await new Promise(res => {
		setTimeout(() => {
			debug(`waiting response ${body}`);
			res();
		}, 100);
	})
	debug(`successfully response ${body}`);
}

http.createServer(async (req, res) => {
	debug(`incoming req ${req.url}`)
	
	const body = await new Promise((res, rej) => {
		const body = [];
    		req
		.on('error', err => {
        		rej(err);
     	 	})
      		.on('data', chunk => {
        		body.push(chunk);
      		})
      		.on('end', () => {
        		res(Buffer.concat(body).toString());
      		})		
	})

	const id = crypto.randomBytes(16).toString("hex");
	const currentResource = executionAsyncResource();
	currentResource[kResourceStore] = { cid: id };

	await routes(req.url, body);
	res.end("ok")
}).listen(3000, () => debug("listening on 3000 port"))
