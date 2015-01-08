var fs = require('fs')
var httpHelper = require('./http-helpers.js')
exports.get = {
  '/': function(req, res){httpHelper.serveAssets(res, './web/public/index.html')},
  '/styles.css': function(req, res){httpHelper.serveAssets(res, './web/public/styles.css')},
  '/loading.html': function(req, res){httpHelper.serveAssets(res, './web/public/loading.html')}
}

exports.post = {
  '/': function (req, res) {
    var chunkedData = ''
    req.on('data', function(chunk) {
      chunkedData += chunk
    })
    req.on('end', function(){
      res.writeHead(303, {location: '/loading.html'})
      var url = chunkedData.slice(4)
      console.log('Aye, this is me ' + url)
      fs.appendFile('./archives/sites.txt', url+'\n', function(){
        res.end('yo')
      })
    })
  }
}
