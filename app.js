var bocco = require('./bocco.js');
//console.log( bocco );

//メッセージ一覧を取得
//コールバック
var callback_getMessages = function(json){
	console.log("callback_getMessages");
	console.log(json);
};
//bocco.getMessages(callback_getMessages);

/*
//メッセージ送信
//コールバック
var callback_postMessageText = function(json){
	console.log("callback_getMessages");
	console.log(json);
};
bocco.postMessageText("ぼっこにメッセージを送るよ",callback_postMessageText);
*/

/*
//音声メディアの取得
var callback_getMessageMediaAudio = function(json){
	console.log("callback_getMessageMediaAudio");
	console.log(json);
};
bocco.getMessageMediaAudio(callback_getMessageMediaAudio);
*/

var url = "https://api.bocco.me/1/messages/130467.wav";
//ブラウザAPIキー
var apiKey = "AIzaSyAFltwcHvvnDCYDwo6fezLntFeHFrSXL70";
var request = require('superagent');
var speech = require('google-speech-api');
var opts = {file:'output.flac',key:apiKey,lang:'ja-JP'};

speech(opts, function(err, results) {
    console.log( {err:err} );
    console.log( {results:results} );
  });
  
/*
request.get(url)
  .pipe(speech(opts, function (err, results) {
    console.log( {err:err} );
    console.log( {results:results} );
  }));
*/



