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

# Google Cloud Storage Authorization Setup

## Creating a project
- log into the *Google Developers Console* <https://console.developers.google.com/home/dashboard>
- in the menu bar, click on the "Select a project" or <name of already selected project> Menu
- click on "Create a project…""
- select a name and id and click on "Create"
- click on "Use Google APIs", select "Credentials" in the left menu
- click on "Create credentials", "Service account key"
- in the "Service account" dropdown menu, select "New service account", and give it a name and service account ID
- keep the default "Key type" as "JSON" and click on "Create"
- the downloaded JSON file corresponds to the <keyFilename> option to synchronize Google store data
- the "Service account ID" is a e-mail that can be used to authorize the project on the app publisher account (see below)

## Authorizing a project on the app publisher account
Log into the *Google Play Developer Console* <https://play.google.com/apps/publish/>

You should see a list of your apps

To authorize access to, in this example, the view of financial reports:
- go in "Settings", "User accounts & rights"
- click on "Invite a new user"
- fill in the e-mail associated with the project <projectId> that will be used to synchronize Google store data
- set "Role" to "Finance"
- click on "Send Invitation"