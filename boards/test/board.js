var TestBoard = function(){};
TestBoard.prototype.init = function(el){
	var self = this;
	/* Example from http://raphaeljs.com/chart.html */
	Raphael(function () {
        var r = Raphael(el, 620, 250),
            e = [],
            clr = [],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            values = [],
            now = 0,
            month = r.text(310, 27, months[now]).attr({fill: '#fff', stroke: 'none', 'font': '100 18px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif'}),
            rightc = r.circle(364, 27, 10).attr({fill: '#fff', stroke: 'none'}),
            right = r.path('M360,22l10,5 -10,5z').attr({fill: '#000'}),
            leftc = r.circle(256, 27, 10).attr({fill: '#fff', stroke: 'none'}),
            left = r.path('M260,22l-10,5 10,5z').attr({fill: '#000'}),
            c = r.path('M0,0').attr({fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round'}),
            bg = r.path('M0,0').attr({stroke: 'none', opacity: .3}),
            dotsy = [];
        function randomPath(length, j) {
            var path = '',
                x = 10,
                y = 0;
            dotsy[j] = dotsy[j] || [];
            for (var i = 0; i < length; i++) {
                dotsy[j][i] = Math.round(Math.random() * 200);
                // if (i) {
                //     path += 'C' + [x + 10, y, (x += 20) - 10, (y = 240 - dotsy[j][i]), x, y];
                // } else {
                //     path += 'M' + [10, (y = 240 - dotsy[j][i])];
                // }
                if (i) {
                    x += 20;
                    y = 240 - dotsy[j][i];
                    path += ',' + [x, y];
                } else {
                    path += 'M' + [10, (y = 240 - dotsy[j][i])] + 'R';
                }
            }
            return path;
        }
        for (var i = 0; i < 12; i++) {
            values[i] = randomPath(30, i);
            clr[i] = Raphael.getColor(1);
        }
        c.attr({path: values[0], stroke: clr[0]});
        bg.attr({path: values[0] + 'L590,250 10,250z', fill: clr[0]});
        var animation = function () {
            var time = 500;
            if (now == 12) {
                now = 0;
            }
            if (now == -1) {
                now = 11;
            }
            var anim = Raphael.animation({path: values[now], stroke: clr[now]}, time, '<>');
            c.animate(anim);
            bg.animateWith(c, anim, {path: values[now] + 'L590,250 10,250z', fill: clr[now]}, time, '<>');
            month.attr({text: months[now]});
        };
        var next = function () {
                now++;
                animation();
            },
            prev = function () {
                now--;
                animation();
            };
        rightc.click(next);
        right.click(next);
        leftc.click(prev);
        left.click(prev);
    });
}
