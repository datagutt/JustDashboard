/*Copyright (c) 2012 Jessie

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var LIB;LIB=LIB||{};(function(e){var t=e.document,n=function(e,t){var n=e[t];return typeof n=="object"&&null!==n},r=function(e,t){var n=e[t];var r=typeof n;return r=="function"||r=="object"&&null!==n||r=="unknown"},i=function(){var e=arguments.length;while(e--){if(!LIB[arguments[e]]){return false}}return true},s=n(t,"documentElement")&&t.documentElement,o=!!Function.prototype.call,u=!!(s&&n(s,"style"));var a;if(r(e,"XMLHttpRequest")){try{if(new e.XMLHttpRequest){a=function(){return new XMLHttpRequest}}}catch(f){}}var l;if(o&&Array.prototype.slice){l=function(e,t){var n=Array.prototype.slice.call(arguments,2);if(n.length){return function(){e.apply(t,Array.prototype.concat.apply(n,arguments))}}return function(){e.apply(t,arguments)}}}var c;c=function(e){var t=[];for(var n=0,r=e.length;n<r;n++){t[n]=e[n]}return t};var h;if(a&&l){h=function(e,t,n){function u(e){var t=false,n=e.status,r=n>=200&&n<300,i=n===304;if(r||i||n===0&&e.responseText){t=true}return t}function a(){if(e.readyState===4){if(u(e)){if(i){i(e.responseText,e)}}else if(s){s(e)}if(o){o(e)}}}n=n||{};n.thisObject=n.thisObject||e;var r=n.data||null,i,s,o;if(n.success){i=l(n.success,n.thisObject)}if(n.fail){s=l(n.fail,n.thisObject)}if(n.complete){o=l(n.complete,n.thisObject)}e.open("POST",t);e.setRequestHeader("Content-Type","application/x-www-form-urlencoded");e.setRequestHeader("X-Requested-With","XMLHttpRequest");e.onreadystatechange=a;e.send(r);return e}}var p;if(a&&l){p=function(e,t,n){function o(e){var t=false,n=e.status,r=n>=200&&n<300,i=n===304;if(r||i||n===0&&e.responseText){t=true}return t}function u(){if(e.readyState===4){if(o(e)){if(r){r(e.responseText,e)}}else if(i){i(e)}if(s){s(e)}}}n=n||{};n.thisObject=n.thisObject||e;var r,i,s;if(n.success){r=l(n.success,n.thisObject)}if(n.fail){i=l(n.fail,n.thisObject)}if(n.complete){s=l(n.complete,n.thisObject)}e.open("GET",t);e.setRequestHeader("X-Requested-With","XMLHttpRequest");e.onreadystatechange=u;e.send(null);return e}}var d;if(s&&"string"==typeof s.textContent){d=function(e,t){e.textContent=t}}else if(s&&"string"==typeof s.innerText){d=function(e,t){e.innerText=t}}var v;if(s&&"string"==typeof s.innerHTML){v=function(e,t){e.innerHTML=t}}var m;if(s&&"string"==typeof s.className){m=function(e,t){var n,r;if(e.className){if(e.className==t){e.className=""}else{n=new RegExp("(^|\\s)"+t+"(\\s|$)");r=e.className.match(n);if(r&&r.length==3){e.className=e.className.replace(n,r[1]&&r[2]?" ":"")}}}}}var g;if(t&&r(t,"querySelectorAll")&&c){g=function(e,t){return c((t||document).querySelectorAll(e))}}var y;if(n(e,"JSON")&&r(JSON,"parse")){y=function(e){return JSON.parse(e)}}var b;if(s&&"string"==typeof s.className){b=function(e,t){return(new RegExp("(^|\\s)"+t+"(\\s|$)")).test(e.className)}}var w;if(s&&"string"==typeof s.textContent){w=function(e){return e.textContent}}else if(s&&"string"==typeof s.innerText){w=function(e){return e.innerText}}var E;if(o){E=function(e,t,n){for(var r=0,i=e.length;r<i;r++){t.call(n,e[r],r,e)}}}var S;var x;if(r(e,"addEventListener")){S=function(e){x=true;window.addEventListener("load",e,false)}}var T;if(s&&r(s,"addEventListener")){T=function(e){e.preventDefault()}}else if(s&&r(s,"attachEvent")){T=function(e){e.returnValue=false}}var N;if(s&&r(s,"addEventListener")){N=function(e,t,n){var r=function(t){n.call(e,t)};e.addEventListener(t,r,false);return r}}else if(s&&r(s,"attachEvent")){LIB.theseObjects=[];var C=0;N=function(e,t,n){var r=C++;LIB.theseObjects[r]=e;var i=function(){var t=window.event;n.call(e,t)};e.attachEvent("on"+t,i);e=null;return i}}var k;if(a&&h){k=function(e,t){var n=a();return h(n,e,t)}}var L;if(a&&p){L=function(e,t){var n=a();return p(n,e,t)}}var A;if(s&&n(s,"classList")&&r(s.classList,"add")){A=function(e,t){return e.classList.add(t)}}else if(s&&"string"===typeof s.className){A=function(e,t){var n;if(!e.className){e.className=t}else{n=new RegExp("(^|\\s)"+t+"(\\s|$)");if(!n.test(e.className)){e.className+=" "+t}}}}LIB.isHostMethod=r;LIB.isHostObjectProperty=n;LIB.areFeatures=i;LIB.xhrCreate=a;LIB.bind=l;LIB.toArray=c;LIB.xhrPost=h;LIB.xhrGet=p;LIB.setText=d;LIB.setHtml=v;LIB.removeClass=m;LIB.query=g;LIB.parseJson=y;LIB.hasClass=b;LIB.getText=w;LIB.forEach=E;LIB.deferUntilReady=S;LIB.cancelDefault=T;LIB.attachListener=N;LIB.ajaxPost=k;LIB.ajaxGet=L;LIB.addClass=A;t=s=null})(this)