const covfefe = require('./index');
const assert = require('assert');
const pitesti = require('pitesti');

const test = pitesti();

test`adds covfefe`(() => assert.equal(covfefe('Despite the constant negative press'), 'Despite the constant negative press covfefe'));
test`despite undefined covfefe`(() => assert.equal(covfefe(), 'undefined covfefe'));

test();
