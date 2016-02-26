'use strict';

var getAppStoreReport = require('./apple/getAppStoreReport');
var googleCloudStorageSync = require('./google/gsync');

module.exports = {
    getAppStoreReport: getAppStoreReport,
    googleCloudStorageSync: googleCloudStorageSync,
};