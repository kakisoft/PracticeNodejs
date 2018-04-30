var settings = require('./settings');
var http = require('http'),
      fs = require('fs');

http.createServer(function(req, res){
    res.setHeader('Content-Type','text/plain');
    res.end('Hello world\n');
}).listen(settings.PORT_NUMBER, settings.IP_ADDRESS );
console.log('Server running at http://'+ settings.IP_ADDRESS +':' + settings.PORT_NUMBER )

