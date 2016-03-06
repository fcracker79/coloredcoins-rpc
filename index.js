'use strict'

var request = require('request')
// var qs = require('qs')

function ColoredCoins (ccPath) {
  this.ccPath = ccPath
}

function handleResponse (err, response, body, cb) {
  if (err) return cb(err)
  if (response.statusCode === 204) return cb({code: 204, message: 'no content'})
  if (response.statusCode === 404) return cb({code: 404, message: 'no such func'})
  if (response.statusCode !== 200) return cb(body)
  if (body && typeof body === 'string') {
    body = JSON.parse(body)
  }
  cb(null, body)
}

function buildForm (params) {
  var form = ''
  if (params && Object.keys(params).length) {
    form += '?'
    var firstOptional = true
    Object.keys(params).forEach(function (key) {
      var value = params[key]
      if (!firstOptional) {
        form += '&'
      }
      form += (key + '=' + value)
      firstOptional = false
    })
  }
  return form
}

ColoredCoins.prototype.get = function (method, params, formParams, cb) {
  if (typeof formParams === 'function') {
    cb = formParams
    formParams = null
  }
  
  var params_string = ''
  Object.keys(params).forEach(function (key) {
    var value = params[key]
    params_string += '/' + value    
  })
  params_string += buildForm(formParams)
  var path = this.ccPath + '/' + method + params_string
  request.get(path, function (err, response, body) {
    handleResponse(err, response, body, cb)
  })
}

ColoredCoins.prototype.post = function (method, params, cb) {
  var path = this.ccPath + '/' + method
  request.post(path, {json: params}, function (err, response, body) {
    handleResponse(err, response, body, cb)
  })
}

module.exports = ColoredCoins
