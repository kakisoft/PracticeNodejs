// console.log("hello world");

//===================
//   non blocking
//===================
//Node.jsでは、処理に時間にかかりそうな setTimeoutなどのタイマー処理や、DBアクセス、
//ファイルIOといった命令は、次の命令をブロックしないように書く必要がある。

//具体的には、タイマー処理が終わった後に実行する処理を、関数で渡す。※「コールバック関数」と言う
setTimeout(function() {
    console.log("hello");
}, 1000);
console.log("world");
//↑の書き方では、setTimeoutの終了を待たずに、"world" が出力される。


//===================
//     blocking
//===================
var start = new Date().getTime();
while (new Date().getTime() < start + 1000);
console.log("world");
//↑の書き方では、タイマーが終了した後、"world" が出力される。

//※Node.js で、このように書いてしまうと、全てのリクエストをブロックしてしまう。（メインのスレッドは１つしかないため）

//------
// 総括
//------
//「時間のかかりそうな処理を、コールバック関数で実装する」