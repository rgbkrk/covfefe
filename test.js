const covfefe = require('./index');
const assert = require('assert');
const pitesti = require('pitesti');

const test = pitesti();

test`adds covfefe`(() => assert.equal(covfefe('foo'), 'foo covfefe'));

test();
