var settings = require('./settings');
var http = require('http'),
      fs = require('fs');
var server = http.createServer(); //サーバ作成

/*
http://192.168.33.10:4000/
*/

console.log(settings);

var msg;
//イベントを結び付ける（リクエストが飛んで来たら、XXをするというイベントを記述する）
server.on('request', function(req, res) { //コールバック関数の引数には、req（リクエスト）と、res（レスポンス）のオブジェクトを取る。
    fs.readFile(__dirname + '/public_html/hello.html', 'utf-8', function(err, data) {
        // __dirname  現在のディレクトリ
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("not found!");
            return res.end();            
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);
console.log("server listening ...");
