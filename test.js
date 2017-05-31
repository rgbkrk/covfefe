const covfefe = require('./index');
const assert = require('assert');
const pitesti = require('pitesti');

const test = pitesti();

test`adds covfefe`(() => assert.equal(covfefe.add('Despite the constant negative press'), 'Despite the constant negative press covfefe'));
test`adds covfefe to RTL strings`(() => assert.equal(covfefe.add('بر خلاف منفی‌نگری دائم رسانه'), 'covfefe بر خلاف منفی‌نگری دائم رسانه'));
test`despite undefined covfefe`(() => assert.equal(covfefe.add(), 'undefined covfefe'));
test`translate - despite the negative press coverage`(() => assert.equal(covfefe.translate('despite the negative press coverage'), 'despite the negative press covfefe'))

test();
