var settings = require('./settings');
var http = require('http'),
      fs = require('fs');

var server = http.createServer();
server.on('request',doRequest);
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);
//server.listen(1337);

function doRequest(req, res){
    fs.readFile('./MyPage01.html','UTF-8',doRead)
    var title = "Sample Page";
    var message = "This is test message";

    function doRead(err, data){
        var str = data.replace(/@@@title@@@/g,title)
                      .replace(/@@@message@@@/g,message)
        res.setHeader('Content-Type','text/html')
        res.write(str);
        res.end();
    }
}

console.log('Server running at http://' + settings.IP_ADDRESS +':' + settings.PORT_NUMBER+ '')
