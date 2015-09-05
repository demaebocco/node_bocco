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
//bocco.postMessageText("ぼっこにメッセージを送るよ");

//音声メディアの取得
var callback_getMessageMediaAudio = function(json){
	console.log("callback_getMessageMediaAudio");
	console.log(json);
};
bocco.getMessageMediaAudio(130260, callback_getMessageMediaAudio);