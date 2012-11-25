/* XbmcRequest taken and modified from https://github.com/blakeblackshear/xbmc-lib/blob/master/src/XbmcRequest.js */
var XbmcRequest = function XbmcRequest(options) {
	var host, postData, xhr, result = false;
	xhr = new XMLHttpRequest();
	host = options.settings.host !== null ? 'http://' + options.settings.host : '';
	if(host && options.settings.port){
		host += ':' + options.settings.port;
	}
	xhr.open('POST', '' + host + '/jsonrpc', true, options.settings.username, options.settings.password);
	postData = {
		jsonrpc: '2.0',
		method: options.method,
		params: options.params,
		id: 1
	};
	xhr.send(JSON.stringify(postData));
	if(options.callback != null){
		xhr.onreadystatechange = function(){ 
			if(xhr.readyState === 4){
				result = options.callback(JSON.parse(xhr.responseText).request);
			}
		};
	}
	return result;
};
var XBMCBoard = function(){};
XBMCBoard.prototype.init = function(el, config){
	var self = this;
	self.update(el, config.host, config.port);
	setInterval(function(){
		self.update(el, config.host, config.port);
	}, 1 * 60 * 1000);
}
XBMCBoard.prototype.callback = function(data){
	var self = this;
	var item, showtitle = '', season = 0, episode = 0, title = '';
	var parsed = eval('(' + x + ')');
	if(parsed){
		if(item = parsed.result.item){
			showtitle = item.showtitle;
			season = item.season;
			episode = item.episode;
			title = item.title;
		}
		if(showtitle && season && episode && title){
			el.innerHTML = '<div id="nowplaying"><p>'+showtitle+'</p><p>'+season+'x'+episode+' '+title+'</div>';
		}else{
			el.innerHTML = '<div id="nowplaying">Nothing playing</div>';
		}
	}else{
		el.innerHTML = '<p>Can not load XBMC data</p>';
	}
}
XBMCBoard.prototype.update = function(el, host, port){
	var self = this;
	if(!port){
		port = 8080;
	}
	var url = 'http://'+host+':'+port+'/jsonrpc?Player.GetItem&playerid=1';
	/*if(LIB && LIB.areFeatures('ajaxPost')){
		LIB.ajaxPost(url, {
			'success': function(data){
				var parsed;
				if(LIB && LIB.areFeatures('parseJson') && data){
					parsed = LIB.parseJson(data);
				}
				if(parsed){
					self.callback(el, parsed);
				}
				console.log(data);
			}
		});
	}*/
	/*if(LIB && LIB.areFeatures('parseJson', 'forEach')){
		if(Loader && LIB.isHostMethod(Loader, 'load')){
			window.xbmcCallback = self.callback;
			Loader.load(url, false, function(){
				if(window.xbmcCallback && typeof window.xbmcCallback == 'function'){
					delete window.xbmcCallback;
				}
			});
		}
	}*/
	var request = new XbmcRequest({
		method: 'Player.GetItem',
		settings: {
			host: host,
			port: port
		},
		params: {
			playerid: 1
		},
		callback: self.callback
	});
}