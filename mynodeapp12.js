var settings = require('./settings');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring')

var server = http.createServer();
server.on('request',doRequest);
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);

function doRequest(req, res){
    var path = url.parse(req.url);
    switch(path.pathname){
        case '/':
            fs.readFile('./MyPage03.html','UTF-8',function(err,data){
                var result = data.replace(/@@@@@/,'Write Something');
                res.setHeader('Content-Type','text/html');
                res.write(result);
                res.end();
            })
            break;
        
        case '/form':
            if ( req.method == "POST"){
                var reqBody = '';
                req.on('data',function(data){
                    reqBody += data;
                });
                req.on('end',function(){
                    var form = qs.parse(reqBody);
                    var input1 = form.input1
                    fs.readFile('./MyPage03.html','UTF-8',function(err,data){
                        var result = data.replace(/@@@@@/,"You Inputted ["+input1+"].");
                        res.setHeader('Content-Type','text/html');
                        res.write(result);
                        res.end();
                    });
                });
            }else{
                res.setHeader('Content-Type','text/plain');
                res.end("ERROR! -CAN'T GET-");
            }
            break;
        
        default:
            res.setHeader('Content-Type','text/plain');
            res.end('ERROR! -NO PAGE-');
            break;
        
    }
}

console.log('Server running at http://' + settings.IP_ADDRESS +':' + settings.PORT_NUMBER+ '')