// describe('Test', function () {
//   it('Should do nothing', function (done) {
//     done()
//   })
// })

var get = function (method, params, formParams, cb) {
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
  cb(null, path)
}

function buildForm (params) {
  var form = ''
  console.log('buildForm #1')
  if (params && Object.keys(params).length) {
  	console.log('buildForm #2, params.length  = ', params.length)
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

var params1 = {
	utxo: '1234:0',
	txid : '5678'
}
var params2 = {
	verbosity: '0'
}
get('assetmetadata', params1, params2, function (err, res) {
	console.log('res = ', res)
})
get('assetmetadata', params1, function (err, res) {
	console.log('res = ', res)
})




