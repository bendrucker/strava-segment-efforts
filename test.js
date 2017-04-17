'use strict'

var test = require('tape')
var nock = require('nock')
var concat = require('concat-stream')
var efforts = require('./')

test('offline', function (t) {
  t.plan(1)

  var api = nock('https://www.strava.com', {
    reqheaders: {
      authorization: 'Bearer token'
    }
  })

  api
    .get('/api/v3/segments/123/all_efforts')
    .query({
      athlete_id: '456'
    })
    .reply(200, [{
      id: 789
    }])

  efforts({
    segmentId: 123,
    athleteId: 456,
    accessToken: 'token'
  })
  .pipe(concat(function (data) {
    t.deepEqual(data, [{id: 789}])
  }))

  nock.restore()
})

var accessToken = process.env.STRAVA_ACCESS_TOKEN

if (accessToken) {
  test('online', function (t) {
    t.plan(1)

    efforts({
      segmentId: 229781,
      athleteId: 5723594,
      accessToken
    })
    .pipe(concat(function (data) {
      t.ok(data.every(function (row) {
        return row.name === 'Hawk Hill'
      }))
    }))
  })
}
