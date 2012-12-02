var TwitterBoard = function(){};
TwitterBoard.prototype.init = function(el, config){
	var self = this;
	var user = config.user;
	el.innerHTML = 'Loading tweets for <a href="http://twitter.com/'+user+'">@'+user+'</a>...';
	self.update(el, user);
	setInterval(function(){
		self.update(el, user);
	}, 10 * 60 * 1000);
}
TwitterBoard.prototype.update = function(el, user){
	if(twitter && twitter.getTimeline){
		twitter.getTimeline(user, function(tweets){
			if(tweets){
				var tweet = tweets[0];
				el.innerHTML = '<p><a href="http://twitter.com/'+tweet.user.name+'">@'+tweet.user.name+'</a>: <span class="text">'+tweet.text+'</span></p>';
			}
		});
	}else{
		el.innerHTML = '<p>No tweets found for <a href="http://twitter.com/'+user+'">@'+user+'</a>.</p>';
	}
}