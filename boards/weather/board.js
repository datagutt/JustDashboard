var WeatherBoard = function(){};
WeatherBoard.prototype.init = function(el, config){
	var self = this;
	var location = config.location;
	var unit = config.unit || 'C';
	el.innerHTML = 'Loading weather for '+location+'...';
	self.update(el, location, unit);
	setInterval(function(){
		self.update(el, location, unit);
	}, 10 * 60 * 1000);
}
WeatherBoard.prototype.callback = function(data){
	var self = this;
	var el = WeatherEl;
	var unit = WeatherUnit;
	if(data && data.query){
		var results = data.query.results;
	}
	if(results){
		var result = (results.length > 1) ? results[0] : results;
		var country = result.channel.location.country;
		var city = result.channel.location.city;
		var temp = result.channel.item.condition.temp;
		if(country && city && temp){
			el.innerHTML = '<h2>Weather</h2><p>'+temp+'&deg;'+unit+'</p><p>'+city+', '+country+'</p>';
		}else{
			el.innerHTML = '<h2>Weather</h2><p>No weather found for '+location+'</p>';
		}
	}
}
WeatherBoard.prototype.update = function(el, location, unit){
	var self = this;
	WeatherEl = el;
	WeatherUnit = unit;
	if(location){
		var now = new Date();
		var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?format=json&rnd='+now.getFullYear()+now.getMonth()+now.getDay()+now.getHours()+'&diagnostics=false&callback=weatherCallback&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
		weatherUrl += 'select * from weather.forecast where location in (select id from weather.search where query="'+location+'") and u="'+unit.toLowerCase()+'"';
		if(LIB && LIB.areFeatures('parseJson', 'forEach')){
			if(Loader && LIB.isHostMethod(Loader, 'load')){
				window.weatherCallback = self.callback;
				Loader.load(weatherUrl, false, function(){
					if(window.weatherCallback && typeof window.weatherCallback == 'function'){
						delete window.weatherCallback;
					}
					
				});
			}
		}
	}else{
		el.innerHTML = '<p>No location provided for weather</p>';
	}
}