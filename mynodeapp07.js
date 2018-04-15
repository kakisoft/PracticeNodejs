var settings = require('./settings');
var http = require('http'),
      fs = require('fs'),
      ejs = require('ejs'),
      qs = require('querystring');
var server = http.createServer(); //サーバ作成

/*
http://192.168.33.10:4000/
*/

console.log(settings);

//================
//  
//================
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');
var posts = [];
// fs.readFileSync は、Non-Blockingではなく、Blockingな命令。（これが終わるまで、次の処理は実行されない。）
// 上記では、リクエスト受付前に読んでいるので、ブロッキングでも問題ないという考え。

//================
//   サーバ起動
//================
function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
}
server.on('request', function(req, res) {
    if (req.method === 'POST') {
        req.data = "";  //Requestイベントの初期化
        // req.on("readable", function() { //req.on とする事で、フォームからどんどんデータが送られる。受信している間は "readable" というイベントで取得できる。
        //     req.data += req.read();
        // });
        req.on("data", function(chunk) {  //↑readable イベントの終了時に null が返されるようになり、それを文字列として結合し、イベント終了時に nullが付加されるようになった。
            req.data += chunk;
        });
        req.on("end", function() { // "end" は、「全ての通信が終わったら」
            var query = qs.parse(req.data);
            posts.push(query.name);
            renderForm(posts, res);
        });
    } else {
        renderForm(posts, res);
    }
});
server.listen(settings.PORT_NUMBER, settings.IP_ADDRESS);
console.log("server listening ...");
