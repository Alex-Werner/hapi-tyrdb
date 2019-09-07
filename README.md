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

  const {db}= server;
  const col = await db.collection('users');
  await col.insert({name:'Alex'});
```

See more into the [TyrDB](https://github.com/Alex-Werner/TyrDB) documentation.

## Options

  - `adapter` Adapter - (def: MemoryAdapter()) : Allow to specific another adapter to use
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).
  - `autoInitialize` Adapter - (def: true) : If true, will auto init the db
  - `autoConnect` Adapter - (def: true) : If true, will auto connect the db
  - `path` Adapter - (def: '.db') : Desired relative path to persist the data
