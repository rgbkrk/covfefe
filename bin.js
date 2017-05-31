#! /usr/bin/env node
const covfefe = require('./index')
const preamble = process.argv[2] || '...'
console.log(covfefe(preamble))
