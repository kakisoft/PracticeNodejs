var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');

//MongoClient.connect("mongodb://"+settings.host+"/"+settings.db, function(err, db) {
MongoClient.connect("mongodb://localhost/"+settings.db, function(err, db) {    
    if (err) { return console.dir(err); }
    console.log("connected to db");
    db.collection("users", function(err, collection) {
        var docs = [
            {name: "taguchi", score: 40},
            {name: "fkoji", score: 80},
            {name: "dotinstall", score: 60}
        ];
        /*
        // 全てのドキュメントを表示させたい場合、「collection.find().toArray()」とするのが手っ取り早い。（抽出結果が配列となる。）
        // 「function(err, items) { }」とすると、結果が items という配列で返ってきてくれます。
        //
        // ただし、toArray はすべての抽出結果を配列に直してくれるので、あまりにも多くの抽出結果があるとメモリを圧迫する。
        // そのため、通常は stream を使用する。
        //
        collection.find({name: "taguchi"}).toArray(function(err, items) {
            console.log(items);
        });
        */
        var stream = collection.find().stream();　//stream に対してイベントを設定することができて、データが来たときにいろいろな処理をすることができるようになる。
        stream.on("data", function(item) { //「データが来た時」というイベント
            console.log(item);
        });
        stream.on("end", function() {      // 「データの受信が終わった時」というイベント
            console.log("finished.")
        });
    });
});

/*
現在の MongoDB の初期設定では
「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
というエラーが出て接続に失敗してしまいます。このエラーが出た場合は、

"mongodb://"+settings.host+"/"+settings.db

の部分を、

"mongodb://localhost/"+settings.db

に変更して試してみてください。

もしくは /etc/mongod.conf 内にある bindIp: 127.0.0.1 の行をコメントアウトして MongoDB を再起動するという方法もあります。
*/

/*
//==================================
//           mongoDB
//==================================
## 起動
sudo service mongod start

## 停止
sudo service mongod stop

## 再起動
sudo service mongod restart
*/

/*
//==================================
//         エラーメッセージ
//==================================
ubuntu@ubuntu-xenial:/vagrant/PracticeNodejs$ sudo node mynodeapp08.js
connected to db
/vagrant/PracticeNodejs/node_modules/mongodb/lib/mongo_client.js:804
          throw err;
          ^

TypeError: db.collection is not a function
    at /vagrant/PracticeNodejs/mynodeapp08.js:8:8
    at result (/vagrant/PracticeNodejs/node_modules/mongodb/lib/utils.js:414:17)
    at executeCallback (/vagrant/PracticeNodejs/node_modules/mongodb/lib/utils.js:406:9)
    at /vagrant/PracticeNodejs/node_modules/mongodb/lib/mongo_client.js:271:5
    at connectCallback (/vagrant/PracticeNodejs/node_modules/mongodb/lib/mongo_client.js:940:5)
    at /vagrant/PracticeNodejs/node_modules/mongodb/lib/mongo_client.js:801:11
    at process._tickCallback (internal/process/next_tick.js:112:11)
*/