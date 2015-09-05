var bocco = require('./bocco.js');
//console.log( bocco );

//メッセージ一覧を取得
//コールバック
var callback_getMessages = function(json){
	console.log("callback_getMessages");
	console.log(json);
};
//bocco.getMessages(callback_getMessages);

//メッセージ送信
//コールバック
var callback_postMessageText = function(json){
	console.log("callback_getMessages");
	console.log(json);
};
//bocco.postMessageText("ぼっこにメッセージを送るよ",callback_postMessageText);


//音声メディアの取得
var callback_getMessageMediaAudio = function(json){
	console.log("callback_getMessageMediaAudio");
	console.log(json);
};
//bocco.getMessageMediaAudio(callback_getMessageMediaAudio);


//録音した音声のテキスト変換
// node-google-speech-api の修正 が必要
// node_modules/google-speech-api/index.js
// 60行目に モノラルにするメソッドを追加する       
// .audioChannels(1)

//変換元 BOCCOで録音した音声
var url = "https://api.bocco.me/1/messages/130467.wav";
//ブラウザAPIキー
var apiKey = "AIzaSyAFltwcHvvnDCYDwo6fezLntFeHFrSXL70";

bocco.wav2text(url,apiKey,function( text ){
	if(text != null){
		//変換に成功
		console.log({text:text});
	}
});
