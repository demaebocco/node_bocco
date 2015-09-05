/** BOCCO へのアクセスAPI
*/
var BOCCO = function(){
	this.request = require('request');
	this.uuid = require('node-uuid');
	
    //ルームID
    this.room_id = "f5020da2-f2ec-4d11-a1f9-7a21463a88ba";

    //ユーザーアクセストークン
    this.access_token = "a3d24268891402706e765d128c647429bd922099a2000d79a68a1fec5406cc45";
    
    //BOSSOサーバAPI
	this.API_SERVER_HOST = "https://api.bocco.me/1/rooms/{room_id}/messages";
	
	//受信済みのオーディオID
	this.oldMediaAudioID = -1;
	
	/** 既存のメッセージの取得
     *
     * @param callback コールバック ファンクション
     *
     */
	this.getMessages = function(callback){
		var url = this.API_SERVER_HOST.replace("{room_id}",this.room_id)
					+"?access_token="+this.access_token;
		//console.log( url );
		this.request.get(url, function(err, resp, body){
			//ここでコールバックする
    		callback( JSON.parse(body) );  
		});
	};
	
　　 /** メッセージの送信
     *
     * @param text 送信メッセージ
     * @param callback コールバック ファンクション
     *
     */
	this.postMessageText = function(text,callback){
		var unique_id = this.uuid.v1();
		var url = this.API_SERVER_HOST.replace("{room_id}",this.room_id);
		var op = {'access_token':this.access_token,'media':'text','text':text,'unique_id':unique_id};

		this.request.post(url,{form:op},function(err, resp, body){
			//ここでコールバックする
    		callback( JSON.parse(body) );
		});
	};
	
	/** 音声メディアの取得
     *
     * @param callback コールバック ファンクション
     *
     */
	this.getMessageMediaAudio = function(callback){
		var _this = this;
		var fnc = function(){
			//console.log("cron");
			_this._getMessageMediaAudio(callback);
		};
		
		//定期的に実行する
		setTimeout(fnc,2*1000);
	}
	
	this._getMessageMediaAudio = function(callback){
		var url = this.API_SERVER_HOST.replace("{room_id}",this.room_id)
					+"?access_token="+this.access_token;
					
		this.request.get(url, function(err, resp, body){
			var allJson = JSON.parse(body);
			var json = allJson[allJson.length-1];
			//console.log( json );			
			//最新のメディアタイプが audio だったら取得成功
			if((json.media == 'audio') && (this.oldMediaAudioID != json.id)){
				console.log("audio:"+json.audio);				
				//ここでコールバックする
    			callback( {id:json.id,'audio':json.audio} );
    			
    			//コールバック済みのオーディオIDを保存
    			this.oldMediaAudioID = json.id;    			
			}
			//再度、実行する
    		setTimeout(this._getMessageMediaAudio,2*1000);
		});
	};
};

module.exports = new BOCCO();
