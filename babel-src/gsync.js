'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const async = require('async');
const gcloud = require('gcloud');
const _ = require('lodash');

const defaultOptions = {
    parallelLimit: 5,

    // true is not implemented
    overwriteExisting: false,
};

module.exports = new_();
function new_(mainOptions) {
    mainOptions = _.clone(mainOptions || {});
    _.defaultsDeep(mainOptions, defaultOptions);
    return _.assign(new_.bind(), {
        execute: execute,
    });

    function execute(options) {
        options = _.clone(options || {});
        _.defaultsDeep(options, mainOptions);
        var result = [];
        requireOptions(options, [
            'projectId',
            'keyFilename',
            'outputDirectory',
            'parallelLimit',
            'overwriteExisting',
        ]);
        return new Promise(function(resolve, reject) {
            var gcs = gcloud.storage({
                projectId: options.projectId,
                keyFilename: options.keyFilename,
            });
            var bucket = gcs.bucket(options.bucket);
            var files = [];
            bucket.getFiles({
                prefix: options.prefix,
            })
            .on('error', reject)
            .on('data', function(file) {
                if (typeof options.nameSelector === 'function') {
                    if (!options.nameSelector(file.name)) {
                        return;
                    }
                }
                files.push(file);
            })
            .on('end', function() {
                return async.eachLimit(files, options.parallelLimit, function(file, eachCallback) {
                    return syncFile(bucket, file, path.join(options.outputDirectory, file.name), eachCallback);
                }, function(err) {
                    return err ? reject(err) : resolve(result);
                });
            });
        });
    }
}

function syncFile(bucket, file, destinationName, callback) {
    return mkdirp(path.dirname(destinationName), function(err) {
        if (err) {
            return callback(err);
        }
        return fs.exists(destinationName, function(exists) {
            if (exists) {
                return callback();
            }
            return bucket.file(file.name).download({
                destination: destinationName,
            }, err => err ? callback(err) : callback());
        });
    });
}

function requireOptions(providedOptions, requiredOptionNames) {
    requiredOptionNames.forEach(function(optionName) {
        if (typeof providedOptions[optionName] === 'undefined') {
            throw new Error('missing option: ' + optionName);
        }
    });
}