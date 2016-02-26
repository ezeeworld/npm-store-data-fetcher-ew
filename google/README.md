# Google Cloud Storage synchronisation utility

## Installation
```sh
$ npm install --save gcloud-sync
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