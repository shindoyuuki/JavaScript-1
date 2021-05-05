const timeElement = document.getElementById('timer');　/*htmlを動かせるように呼び出している？*/
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let elapsed = 0; /*経過時間をあらわす（０に設定しないと最初に動かした時に０からのスタートにならない）*/
let interval = null;　/*間隔*/

function time() { /*timeは、1/1000をあらわすタグ*/
  let milli = elapsed % 1000;
  let seconds = Math.floor(elapsed / 1000) % 60;　/*Math.floorは小数点以下を四捨五入する*/
  let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
  let hours = Math.floor(elapsed / (1000 * 60 *60));

  let m = milli.toString().padStart(1, '0');　　 /*padStartは表示方法を決める*/
  let s = seconds.toString().padStart(1, '0');   /*toString() メソッドは、オブジェクトを表す文字列を返します。*/
  let min = minutes.toString().padStart(1, '0');
  let h = hours.toString().padStart(1, '0');

  timeElement.textContent = `${h}:${min}:${s}:${m.slice(-1)}` /*表示の形式を決めている*/
;}

/*
「addEventListener()」は、JavaScriptからさまざまなイベント処理を実行することができるメソッドになります。
 .Webページが読み込まれたかどうか？
 .マウスによるクリックがされたかどうか？
 .フォームに何らかの操作が行われたかどうか？
 .キーボードから入力が行われたかどうか？
 .etc…

対象要素.addEventListener( 種類, 関数, false )
第1引数にイベントの種類を指定することで、このイベントがどのようなケースに対応するのかを特定します。
第2引数に関数を指定することで、任意のイベントが発生した時に関数内に書かれた処理を実行できるわけです。
第3引数は、イベント伝搬の方式を「true / false」で指定するのですが通常はfalseを指定しておきましょう。

*/



start.addEventListener('click', function() { 
  if (interval) { return; } /*returnで再スタート時に０からにならない？*/
  let e = new Date();

  interval = setInterval(function() {  /*setInterval…一定時間ごとに特定の処理を繰り返す*/
    let w = new Date();
    elapsed += w - e;
    e = w;
    time();
  }, 10); /*1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言*/
});

stop.addEventListener('click', function() { 
  clearInterval(interval);　/*clearInterval()でセットしたタイマーを解除する*/
  interval = null;         /*interval(間隔)を止めることで一時停止状態になる*/
});

reset.addEventListener('click', function() {
  elapsed = 0;
  time(); /*ここのタイムで上のを呼び出している*/
});