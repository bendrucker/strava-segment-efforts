#!/usr/bin/env node

'use strict'

var meow = require('meow')
var assert = require('assert')
var ndjson = require('ndjson')
var efforts = require('./')

var cli = meow(`
  Usage
    $ strava-segment-efforts \
      --segment-id <segment> \
      --athlete-id <athlete>
      --access-token $STRAVA_ACCESS_TOKEN
`)

assert.equal(typeof cli.flags.accessToken, 'string', 'access token is required')
assert.equal(typeof cli.flags.segmentId, 'number', 'segment id is required')

efforts(cli.flags)
  .pipe(ndjson.stringify())
  .pipe(process.stdout)
