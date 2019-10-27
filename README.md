# Hapi-TyrDB

[![NPM Version](https://img.shields.io/npm/v/hapi-tyrdb.svg?&style=flat-square)](https://www.npmjs.org/package/hapi-tyrdb)
[![Build Status](https://api.travis-ci.org/Alex-Werner/hapi-tyrdb.svg?branch=master)](https://travis-ci.com/Alex-Werner/hapi-tyrdb)

> TyrDB connection plugin for Hapi


### Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Options](#options)
 
## Installation 

`npm install hapi-tyrdb`

## Usage

```js
 const dbOpts = {
    path: '.db',
    db:'test',
    adapter:'FsAdapter'
  };
  await server.register({plugin:require('hapi-tyrdb'), options:dbOpts});
  const colOpts = { uniques :['email']};
  const {db}= server;
  const col = await db.collection('users', colOpts);
  const doc = await col.insert({name:'Alex'});
  const [alex] = await col.find({name:'Alex'});
  alex.name='Jean';
  await col.replace(alex);
  await col.get(alex._id);
  await col.remove({name:'Jean'});
```

See more into the [TyrDB](https://github.com/Alex-Werner/TyrDB) documentation.
You might also want to look into the Tree Engine of TyrDB: [SBTree](https://github.com/Alex-Werner/SBTree) documentation.

#### DB Options

  - `adapter` Adapter - (def: MemoryAdapter()) : Allow to specific another adapter to use
  - `autoInitialize` Adapter - (def: true) : If true, will auto init the db
  - `autoConnect` Adapter - (def: true) : If true, will auto connect the db
  - `path` Adapter - (def: '.db') : Desired relative path to persist the data

#### Col Options
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).
