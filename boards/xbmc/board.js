/* XbmcRequest taken and modified from https://github.com/blakeblackshear/xbmc-lib/blob/master/src/XbmcRequest.js */
var XbmcRequest = function XbmcRequest(options, el) {
	var host, postData, result = false;
	host = options.settings.host !== null ? 'ws://' + options.settings.host : '';
	if(host && options.settings.port){
		host += ':' + options.settings.port;
	}
	var websocket = new WebSocket(host + '/jsonrpc');
	postData = {
		jsonrpc: '2.0',
		method: options.method,
		params: options.params,
		id: 1
	};
	websocket.onopen = function(){
		websocket.send(JSON.stringify(postData));
	};
	if(options.callback != null){
		websocket.onmessage = function(evt){ 
		console.log(evt.data);
			result = options.callback(options.settings, JSON.parse(evt.data));
		};
	}
	return result;
};
var makeControls = function(settings){
	var self = this, host = settings.host, port = settings.port, el = settings.el;
	var playPause = function(){
		var request = new XbmcRequest({
			method: 'Player.PlayPause',
			settings: {
				host: host,
				port: port,
				el: el
			},
			params: {
				playerid: 1
			},
			callback: makeControls
		}, el);
	};
	var stop = function(){
		var request = new XbmcRequest({
			method: 'Player.Stop',
			settings: {
				host: host,
				port: port,
				el: el
			},
			params: {
				playerid: 1
			},
			callback: makeControls
		}, el);
	};
	if(LIB.query('#controls').length == 0){
		var controls = document.createElement('div');
		controls.id = 'controls';
		var playPauseButton = document.createElement('button');
		playPauseButton.id = 'playPauseButton';
		playPauseButton.innerHTML = 'Play';
		controls.appendChild(playPauseButton);
		
		var stopButton = document.createElement('button');
		stopButton.id = 'stopButton';
		stopButton.innerHTML = 'Stop';
		controls.appendChild(stopButton);
		
		el.appendChild(controls);
		
		setTimeout(function(){
			LIB.query('#playPauseButton')[0].onclick = function(){
				playPause();
			};
			LIB.query('#stopButton')[0].onclick = function(){
				stop();
			};
		}, 10);
		
	}
};
var XbmcBoard = function(){};
XbmcBoard.prototype.init = function(el, config){
	var self = this;
	self.update(el, config.host, config.port);
	setInterval(function(){
		self.update(el, config.host, config.port);
	}, 1 * 60 * 1000);
}
XbmcBoard.prototype.callback = function(settings, parsed){
	var self = this;
	var item, showtitle = '', season = 0, episode = 0, title = '', el = settings.el;
	el.innerHTML = '<h2>XBMC</h2>';
	if(parsed){
		if(parsed.result && parsed.result.item){
			item = parsed.result.item;
			showtitle = item.showtitle;
			season = item.season;
			episode = item.episode;
			title = item.title;
		}
		if(showtitle && season && episode && title){
			el.innerHTML += '<div id="nowplaying"><p>'+showtitle+'</p><p>'+season+'x'+episode+' '+title+'</div>';
		}else{
			el.innerHTML += '<div id="nowplaying">Nothing playing</div>';
		}
		makeControls(settings);
	}else{
		el.innerHTML += '<p>Can not load XBMC data</p>';
	}
}
XbmcBoard.prototype.update = function(el, host, port){
	var self = this;
	if(!port){
		port = 8080;
	}
	var request = new XbmcRequest({
		method: 'Player.GetItem',
		settings: {
			host: host,
			port: port,
			el: el
		},
		params: {
			playerid: 1
		},
		callback: self.callback
	});
}