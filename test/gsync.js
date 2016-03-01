'use strict';

/*

Links
    Reports
        Statistics
            https://play.google.com/apps/publish/?dev_acc=03735333337010228305#BulkExportPlace:bet=STATS

Requires private.json i.e.
{
  "projectId": "<projectId>",
  "bucket": "pubsite_prod_rev_<clientId>"
}

Requires key.json given by Google i.e.
{
  "type": "service_account",
  "project_id": "<projectId>",
  "private_key_id": "1acb56ebda534fb71d69301c456baa25d098679b",
  "private_key": <ssh private key>
  "client_email": "<projectId>@<otherProject>.iam.gserviceaccount.com",
  "client_id": "<clientId>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<projectId>%40<otherProject>.iam.gserviceaccount.com"
}

*/

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const gsyncModule = require('../src/built/gsync');
const gsync = gsyncModule();
const privateOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '/private/google-credentials.json')));

describe('module gsync', function() {
    describe('managing instances', function() {
        it('module should be a default instance', function() {
            assert.strictEqual(typeof gsyncModule.execute, 'function');
        });
        it('module can create a new instance', function() {
            assert.strictEqual(typeof gsyncModule, 'function');
            assert.strictEqual(typeof gsync, 'function');
            assert.strictEqual(typeof gsync.execute, 'function');
        });
    });
    describe('execute', function() {
        it('should not throw an error AND sync as expected (manual verification)', function(done) {
            console.log('setting 3min timeout for this test');
            this.timeout(180 * 1000);
            return gsync.execute(_.assign({}, privateOptions, {
                keyFilename: __dirname + '/private/google-key.json',
                prefix: 'stats/installs/installs_',
                nameSelector: function(name) {
                    return name.indexOf('2016') > -1;
                },
                outputDirectory: __dirname + '/outputDirectory/google/' + privateOptions.bucket,
            }))
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        });
    });
});