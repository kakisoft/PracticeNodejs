const IP_ADDRESS = '192.168.33.10'
const PORT_NUMBER = '4000'
/*
http://192.168.33.10:4000/
*/

var http = require('http');
var server = http.createServer(); //サーバ作成
//イベントを結び付ける（リクエストが飛んで来たら、XXをするというイベントを記述する）
server.on('request', function(req, res) { //コールバック関数の引数には、req（リクエスト）と、res（レスポンス）のオブジェクトを取る。
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello world !!!');
    res.end();
});
server.listen(PORT_NUMBER, IP_ADDRESS);
console.log("server listening ...");

