const fs = require("node:fs");
const util = require('node:util');
const path = require("node:path");

function debug(...args) {
  fs.writeFileSync(`${path.basename(require.main.filename, ".js")}.log.out`, `${util.format(...args)}\n`, { flag: 'a' });
}

module.exports = { debug } 
