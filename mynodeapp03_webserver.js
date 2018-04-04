var settings = require('./settings');
var http = require('http');
var server = http.createServer(); //サーバ作成

/*
http://192.168.33.10:4000/
*/

console.log(settings);

var msg;
//イベントを結び付ける（リクエストが飛んで来たら、XXをするというイベントを記述する）
server.on('request', function(req, res) { //コールバック関数の引数には、req（リクエスト）と、res（レスポンス）のオブジェクトを取る。
    switch (req.url) {
        case '/about':
            msg = "about this page";
            break;
        case '/profile':
            msg = "about me";
            break;
        default:
            msg = 'wrong page';
            break;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(msg);
    res.end();
});
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);
console.log("server listening ...");
