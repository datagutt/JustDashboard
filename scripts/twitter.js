/*
Copyright (c) 2009 Marcus Westin

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/
var twitter = {};
if (typeof exports != 'undefined') { exports.twitter = twitter; } // for node.js
(function() {
	// expose this so that it can be overwritten if in e.g. node.js
	twitter.fetchUrl = function(url, callback) {
		var callbackName = '_callback' + (_requestId++);
		
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + '&callback=twitter.' + callbackName;
		script.charset = 'charset="utf-8"';
		
		function cleanup() {
			for (var prop in script) { delete script[prop]; }
			head.removeChild(script);
			delete twitter[callbackName];
		}
		
		var errorTimeout = setTimeout(function onError() {
			cleanup();
			callback(null, "Timeout");
		}, _timeout);
		
		twitter[callbackName] = function(response) {
			clearTimeout(errorTimeout);
			cleanup();
			twitter.addToCache(url, response);
			callback(response);
		}
		
		head.appendChild(script);
	}
	
	var _requestId = 0;
	var _cache = {}; // maps urls to response objects
	var _requests = {};
	var _timeout = 3000;
	
	function _getObjectAsURIParams(params) {
		var result = [];
		for (var key in params) {
			result.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		return result.join('&');
	}
	
	function _doRequest(api, action, args, callback) {
		if (api == 'search') {
			var url = 'http://search.twitter.com/search.json?' + _getObjectAsURIParams(args);
		} else {
			var url = 'http://api.twitter.com/1/' + api + '/' + action + '.json?' + _getObjectAsURIParams(args);
		}
		if (_cache[url]) {
			setTimeout(function(){ callback(_cache[url]); }, 0);
			return;
		}
		
		twitter.fetchUrl(url, callback);
	}
	
	twitter.getTimeline = function(userId, callback) {
		_doRequest('statuses', 'user_timeline', { id: userId }, callback);
	}
	
	twitter.getFriends = function(userId, callback) {
		_doRequest('friends', 'ids', { id: userId }, callback);
	}
	
	twitter.getUserInfo = function(userId, callback) {
		_doRequest('users', 'show', { id: userId }, callback);
	}
	
	twitter.getMentions = function(userId, callback) {
		_doRequest('search', null, { q: '@' + userId }, callback);
	}
	
	twitter.getLoggedInStatus = function(callback) {
		_doRequest('account', 'verify_credentials', callback);
	}
	
	twitter.addToCache = function(url, data) { 
		_cache[url] = data;
	}
	
	twitter.setCache = function(cache) { _cache = cache; }
	twitter.getCache = function() { return _cache; }
})();