# strava-segment-efforts [![Build Status](https://travis-ci.org/bendrucker/strava-segment-efforts.svg?branch=master)](https://travis-ci.org/bendrucker/strava-segment-efforts)

> Retrieve Strava segment efforts as a Readable stream


## Install

```
$ npm install --save strava-segment-efforts
```


## Usage

```js
var efforts = require('strava-segment-efforts')

efforts({
  segmentId: 123,
  athleteId: 456,
  accessToken: 'abc'  
})
.pipe(ndjson.stringify())
.pipe(process.stdout)
```

```sh
strava-segment-efforts \
  --segment-id 123 \
  --athlete-id 456 \
  --access-token abc 
```

## API

#### `efforts(options)` -> `stream`

Returns a readable stream of segment effort objects.

##### options

###### segmentId

*Required*  
Type: `number`

The ID of the segment.

###### athleteId

Type: `number`  
Default: _self_

A Strava user's ID. If no ID is supplied, the "current" user from the access token will be used.

###### accessToken

*Required*  
Type: `string`

A Strava API access token.
## License

MIT © [Ben Drucker](http://bendrucker.me)
