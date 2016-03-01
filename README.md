# Collect Store Data like app install statistics

# Download an iTunes Connect Report using AutoIngestTool

## Installation
```sh
$ npm install --save store-data-fetcher-ew
```

## Prerequesites
See AutoIngestTool README: <https://github.com/linitix/autoingesttool>

## Usage
```js
const getAppStoreReport = require('store-data-fetcher-ew').getAppStoreReport;

// customizing options up-front
const getAppStoreReport = require('store-data-fetcher-ew').getAppStoreReport({ report_type: 'Sales' });

// making an instance available to other files
const getAppStoreReport = require('store-data-fetcher-ew').getAppStoreReport;
getAppStoreReport.myCustomInstance = getAppStoreReport({ report_type: 'Sales' });
// freeing memory: delete getAppStoreReport.myCustomInstance

// if Promise isn't defined
global.Promise = require('promise-module');
var getAppStoreReport = require('store-data-fetcher-ew').getAppStoreReport;
```

### Download an iTunes Connect Report
```js
getAppStoreReport.execute({

  // Mandatory options from AutoIngestTool
  username: '…',
  password: '…',
  vendor_number: '12345678',
  report_type: 'Sales',

  // mandatory for Sales or Newsstand report
  report_subtype: 'Summary',
  date_type: 'Monthly',
  report_date: '201602',

  // mandatory for DRR report (financial report)
  // region_code: 'US',
  // fiscal_year: 2016,
  // fiscal_period: 1,

  // Other mandatory options
  outputDirectory: path.join(__dirname, '/outputDirectory'),
  returnJson: true,
  deleteDownloadedFiles: true,

})
.then(console.log)
.catch(console.log);
```

# Google Cloud Storage synchronisation utility

## Installation
```sh
$ npm install --save store-data-fetcher-ew
```

## Usage
```js
const gsync = require('store-data-fetcher-ew').googleCloudStorageSync;

// customizing options up-front
const gsync = require('store-data-fetcher-ew').googleCloudStorageSync({ parallelLimit: 2 });

// making an instance available to other files
const gsync = require('store-data-fetcher-ew').googleCloudStorageSync;
gsync.custom = gsync({ parallelLimit: 2 });
// freeing memory: delete gsync.custom

// if Promise isn't defined
global.Promise = require('promise-module');
var gsync = require('store-data-fetcher-ew').googleCloudStorageSync;
```

### Synchronizing store data
```js
gsync.execute({

  // MANDATORY FIELDS and example values

  projectId: 'uniqueProjectId',
  keyFilename: __dirname + '/key.json',
  bucket: 'pubsite_prod_rev_<developer-id>',
  prefix: 'stats/installs/installs_',
  outputDirectory: __dirname + '/sync-bucket',

  // OPTIONAL FIELDS and example values

  nameSelector: function(name) {
    return name.indexOf('2016') > -1;
  },

})
.then(() => console.log('Done.'))
.catch(console.error);
```