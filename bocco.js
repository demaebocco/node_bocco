/** BOCCO へのアクセスAPI
*
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
	
	/** 既存のメッセージの取得
     *
     * @param room_id ルームID
     * @param access_token アクセストークン
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
     * @param message_id メッセージID
     *
     */
	this.getMessageMediaAudio = function(message_id,callback){
		var newer_than_id = message_id - 1;
		var url = this.API_SERVER_HOST.replace("{room_id}",this.room_id)
					+"?access_token="+this.access_token
					+"&newer_than="+newer_than_id;
					
		//console.log( url );
		this.request.get(url, function(err, resp, body){			
			//console.log( body );
			var json = JSON.parse(body)[0];
			//メディアタイプが audio だったら取得成功
			if(json.media == 'audio'){							
				//ここでコールバックする
    			callback( json.audio );
			}
			else{
				callback( null );
			}
		});
	};
};

module.exports = new BOCCO();