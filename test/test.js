'use strict';

const expect = require('chai').expect;
const numFormatter = require('../index');

describe('NUMBER FORMATER', function() {
    it('should convert single digits', function() {
        const result = numFormatter(1);
        expect(result).to.equal('1');
    });

    it('should convert 8 digits', function() {
        var result = numFormatter(12345678);
        expect(result).to.equal('12,345,678');
    });
});
