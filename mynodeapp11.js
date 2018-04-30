var settings = require('./settings');
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();
server.on('request',doRequest);
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);

function doRequest(req, res){
    var path = url.parse(req.url);
    switch(path.pathname){
        case '/':
            fs.readFile('./MyPage02.html','UTF-8',doRead)
            function doRead(err, data){
                res.setHeader('Content-Type','text/html')
                res.write(data);
                res.end();
            }
            break;
        
        case '/hello':
            res.setHeader('Content-Type','text/plain');
            res.end('HELO!');
            break;

        default:
            res.setHeader('Context-Type','text/html');
            res.end('ERROR! - NO PAGE -')
            break;
    }
}

console.log('Server running at http://' + settings.IP_ADDRESS +':' + settings.PORT_NUMBER+ '')