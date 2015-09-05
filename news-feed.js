/** ニュース フィードへのアクセスを楽にするモジュール
*
*/
var NewsFeed = function(){
	//フィードパーサー
	this.FeedParser = new require('feedparser');
	
	//HTTPリクエスト
	this.request = require('request');
	
	//コールバック
	this.callbackGetFeed = null;
	
	this.getFeed = function( rss_url, callback){
		var _this = this;
		this.callbackGetFeed = callback;
		var feedParser = new this.FeedParser();
		var req = this.request(rss_url);
		req.on('error', function (error) {
  			// handle any request errors
		});
		req.on('response', function (res) {
  			var stream = this;
  			if (res.statusCode != 200){
  				return this.emit('error', new Error('Bad status code'));
  			}
  			stream.pipe(feedParser);
		});
		
		var feeds = [];
		feedParser.on('error', function(error) {
		  	// always handle errors
		});
		feedParser.on('readable', function() {
		  	// This is where the action is!
		  	feeds.push( this.read() );
		});
		feedParser.on('end', function() {
		  	// This is where the action is!
			_this.callbackGetFeed( feeds );
		});
	};
	
};

module.exports = new NewsFeed();