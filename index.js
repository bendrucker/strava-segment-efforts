'use strict'

var assert = require('assert')
var me = require('strava-me')
var waterfall = require('run-waterfall')
var get = require('simple-get')
var PassThrough = require('stream').PassThrough
var JSONStream = require('JSONStream')

module.exports = SegmentEfforts

function SegmentEfforts (options) {
  assert(options)
  assert(options.segmentId, 'segmentId is required')
  assert(options.accessToken, 'accessToken is required')

  var stream = new PassThrough({
    objectMode: true
  })

  waterfall([
    user,
    efforts
  ], pipe)

  return stream

  function pipe (err, res) {
    if (err) return stream.emit('error', err)
    res
      .on('error', stream.emit.bind(stream, 'error'))
      .pipe(stream)
  }

  function user (callback) {
    if (options.athleteId) {
      return callback(null, {
        id: options.athleteId
      })
    }

    me(options, callback)
  }

  function efforts (user, callback) {
    var request = {
      url: `https://www.strava.com/api/v3/segments/${options.segmentId}/all_efforts?athlete_id=${user.id}`,
      headers: {
        authorization: 'Bearer ' + options.accessToken
      }
    }

    get(request, function (err, res) {
      if (err) return callback(err)
      callback(null,
        res.pipe(JSONStream.parse('*'))
      )
    })
  }
}
