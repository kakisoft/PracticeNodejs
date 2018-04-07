var settings = require('./settings');
var http = require('http'),
      fs = require('fs'),
      ejs = require('ejs');
var server = http.createServer(); //サーバ作成

/*
http://192.168.33.10:4000/
*/

console.log(settings);

//================
//  
//================
var template = fs.readFileSync(__dirname + '/public_html/hello.ejs', 'utf-8');
// fs.readFileSync は、Non-Blockingではなく、Blockingな命令。（これが終わるまで、次の処理は実行されない。）
// 上記では、リクエスト受付前に読んでいるので、ブロッキングでも問題ないという考え。

//================
//   サーバ起動
//================
var requestCount = 0;
var msg;
//イベントを結び付ける（リクエストが飛んで来たら、XXをするというイベントを記述する）
server.on('request', function(req, res) {
    requestCount++;
    var data = ejs.render(template, {
        title: "hello",
        content: "<strong>World!</strong>",
        n: requestCount
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);
console.log("server listening ...");
