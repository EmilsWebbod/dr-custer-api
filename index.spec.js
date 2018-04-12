'use strict';

const test = require('ava');
const numFormatter = require('./index');

test('NUMBER FORMATER', t => {
    t.is(numFormatter(1), '1');
});

test('NUMBER FORMATER 2', t => {
    t.is(numFormatter(2333), '2,333')
});