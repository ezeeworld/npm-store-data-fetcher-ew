'use strict';

const assert = require('assert');
const storeDataFetcherModule = require('../src/built/storeDataFetcher');
const storeDataFetcher = storeDataFetcherModule({
});

describe('module storeDataFetcher', function() {
    describe('managing instances', function() {
        it('module should be a default instance', function() {
            assert.strictEqual(typeof storeDataFetcherModule.getAppStoreReport, 'function');
        });
        it('module can create a new instance', function() {
            assert.strictEqual(typeof storeDataFetcherModule, 'function');
            assert.strictEqual(typeof storeDataFetcher, 'function');
            assert.strictEqual(typeof storeDataFetcher.getAppStoreReport, 'function');
        });
    });
});