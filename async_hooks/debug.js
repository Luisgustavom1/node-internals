const fs = require("node:fs");
const util = require('node:util');

function debug(...args) {
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}

module.exports = { debug } 
