#! /usr/bin/env node
const covfefe = require('./index')
const preamble = process.argv[2] ? process.argv.slice(2).join(' ') : '...'
console.log(covfefe(preamble))
