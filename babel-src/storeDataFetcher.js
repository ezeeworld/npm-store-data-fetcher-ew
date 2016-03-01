'use strict';

const _ = require('lodash');
const getAppStoreReport = require('./getAppStoreReport');
const googleCloudStorageSync = require('./gsync');

const defaultOptions = {
};

module.exports = new_();

function new_(mainOptions) {
    mainOptions = _.clone(mainOptions || {});
    _.defaultsDeep(mainOptions, defaultOptions);
    return _.assign(new_.bind(), {
        getAppStoreReport: getAppStoreReport,
        googleCloudStorageSync: googleCloudStorageSync,
    });
}

function requireOptions(providedOptions, requiredOptionNames) {
    requiredOptionNames.forEach(function(optionName) {
        if (typeof providedOptions[optionName] === 'undefined') {
            throw new Error('missing option: ' + optionName);
        }
    });
}