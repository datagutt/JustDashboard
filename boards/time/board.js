var TimeBoard = function(){};
TimeBoard.prototype.init = function(el){
	var self = this;
	self.update(el);
	setInterval(function(){
		self.update(el);
	}, 1000);
}

TimeBoard.prototype.getMonthName = function(date) {
	var monthNames = [
		'January', 'February', 'March',
		'April', 'May', 'June',
		'July', 'August', 'September',
		'October', 'November', 'December'
	];
    return monthNames[date.getMonth()];
};
TimeBoard.prototype.update = function(el){
	var now = new Date();
	var hr = now.getHours();
	if(hr > 12){
		hr -= 12;
	}
	if(hr == 0){
		hr = 12;
	}
	var mn = now.getMinutes(); 
	if(mn < 10){
		mn = '0' + mn;
	}
	var sc = now.getSeconds();
	if(sc < 10){
		sc = '0' + sc;
	}
	var year;
	if(LIB && LIB.isHostMethod(now, 'getFullYear')){
		year = now.getFullYear()
	}else{
		// This is not a good way to do it, it will fail in some (old) browsers
		var yy = now.getYear();
		year = (yy < 1000) ? yy + 1900 : yy;
	}
	var day = now.getDate();
	var month = this.getMonthName(now);
	el.innerHTML = '<div class="clock">'+hr+ ':'+mn+':'+sc+ ' '+(hr >= 12 ? 'PM' : 'AM')+'</div><div class="date">'+day+' '+month+', '+year+'</div>';
}