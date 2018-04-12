'use strict';

const test = require('ava');
const numFormatter = require('./index');

test('NUMBER FORMATER', t => {
    t.is(numFormatter(1), '1');
});