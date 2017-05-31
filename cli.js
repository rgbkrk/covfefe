#! /usr/bin/env node
const covfefe = require('./index')
const BufferList = require('bl')

var bl = new BufferList();

if (process.stdin.isTTY) {
  if (process.argv.length === 2) {
    require('./covfefe-art.js');
  } else {
    const preamble = process.argv[2] ? process.argv.slice(2).join(' ') : '...'
    console.log(covfefe(preamble));
    process.exit(0);
  }
} else {
  process.stdin.pipe(bl);

  process.stdin.on('end', () => {
    const preamble = bl.toString().slice(0, -1) || '...';
    console.log(covfefe(preamble));
  });
}
