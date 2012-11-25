;(function (global, doc) {
    var Loader = function () {};
    var scripts = document.getElementsByTagName('script');
    var script = scripts[scripts.length - 1];
    Loader.prototype.load = function (url, args, callback) {
        if (!url) {
            throw new Error('No url provided!');
        }
        var e = doc.createElement('script');
        var scriptDone = false;
        e.onload = e.onreadystatechange = function () {
            if ((e.readyState && (e.readyState == 'complete' || e.readyState !== 'loaded')) || !scriptDone) {
                e.onload = e.onreadystatechange = null;
                scriptDone = true;
                if (typeof callback == 'function') {
                    if(args){
                        callback.apply(global, args);
                    }else{
	                    callback();
                    }
                }
            }
        };
        e.src = url;
        e.type = 'text/javascript';
        script.parentNode.appendChild(e);
    };
    if (doc.readyState == null && doc.addEventListener) {
        doc.readyState = 'loading';
        doc.addEventListener('DOMContentLoaded', handler = function () {
            doc.removeEventListener('DOMContentLoaded', handler, false);
            doc.readyState = 'complete';
        }, false);
    }
    global.Loader = new Loader();
})(window, document);