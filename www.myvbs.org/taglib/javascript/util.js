var _tlutil=this;

function addEvent(elm, evType, fn, useCapture){
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  }
}

function removeEvent(elm, evType, fn, useCapture){
  if (elm.removeEventListener){
    elm.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.detachEvent){
    var r = elm.detachEvent("on"+evType, fn);
    return r;
  }
}

function getObjPos(obj){
	var l=0;
	var t=0;
	while(obj.offsetParent){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	l+=obj.offsetLeft;
	t+=obj.offsetTop;
	return{x:l,y:t};
}

function getMousePos(ev){
	ev=ev||window.event;
	if(ev.pageX){
		return{x:ev.pageX,y:ev.pageY};
	}else{
		return{
			x:ev.clientX+document.documentElement.scrollLeft-document.body.clientLeft,
			y:ev.clientY+document.documentElement.scrollTop-document.body.clientTop
		};
	}
}

function getScroll() {
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    return {x:window.pageXOffset, y:window.pageYOffset};
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    return {x:document.body.scrollLeft, y:document.body.scrollTop };
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    return {x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop };
  }
	return {x:0,y:0};
}

function classAdd(obj,cls){
	if(!obj){
		if(window.console) console.log('classAdd: object does not exist');
		return;
	}
	var spc=(obj.className>''?' ':'');
	obj.className+=spc+cls;
}

function classRem(obj,cls){
	if(!obj){
		if(window.console) console.log('classRem: object does not exist');
		return;
	}
	var re=new RegExp(cls,"g");
	str=obj.className;
	bf=str;
	str=str.replace(re,'');
	str=str.replace(/  /g,' ');
	obj.className=str;
}

function $(what){
	return document.getElementById(what)||document.getElementsByName(what)[0];
}

function $S(what){
	return $(what).style;
}

function $H(what){
	return $(what).innerHTML;
}

function getQuery(){
	var args=new Array();
	var pairs=window.location.search.replace(/^\?/,'').split('&');
	for(var i=0;i<pairs.length;i++){
		pairs[i]=pairs[i];
		if(pairs[i].search(/^(.*?)=(.*)/)==0){
			var p=RegExp.$1;
			var v=RegExp.$2;
			args[p]=unescape(v);
		}
	}
	return args;
}

function radioValue(which){
	var radios=document.getElementsByName(which);
	for(var i=0;i<radios.length;i++){
		if(radios[i].checked){
			return radios[i].value;
		}
	}
	return '';
}

function scrollVisible(obj){
	if(arguments.length>1){
		// for elements at bottom of screen to clear
		scrollExtra=arguments[1];
	}else{
		scrollExtra=3;
	}
	var mytop=getObjPos(obj).y;
	var myheight=obj.offsetHeight;
	var myscroll=getScroll().y;
	var winheight=window.innerHeight;
	if(mytop+myheight>winheight+myscroll){
		if(myheight>winheight){
			document.documentElement.scrollTop=mytop-3;
		}else{
			document.documentElement.scrollTop=mytop+myheight-winheight+scrollExtra;
		}
	}else if(mytop<myscroll){
		document.documentElement.scrollTop=mytop-3;
	}
}

function dateVal(str){
	if(str.search(/^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{1,4})$/)==0){
		var mo=RegExp.$1;
		var da=RegExp.$2;
		var yr=RegExp.$3;
		//alert(mo+' - '+da+' - '+yr);
		if(mo<1 || mo>12) return false;
		if(da<1 || da>31) return false;
		if(yr<1) return false;
		return true;
	}else{
		return false;
	}
}

function prettyNum(numIn){
	var num=numIn.toString();
	while(num.match(/\d{4,}/)){
		num=num.replace(/(\d+)(\d{3})/,'$1,$2');
	}
	return num;
}

function trim(what){
	what=what.replace(/^\s*/,'');
	what=what.replace(/\s*$/,'');
	return what;
}

function httpPrefix(obj){
	var str=obj.value;
	if(str=='') return false;
	if(str.match(/^[\.\/]/)) return false;
	if(!str.match(/^https?:\/\//)){
		str='http://'+str;
		obj.value=str;
	}
}

function hasH5mp3(){
	try{
		var a=document.createElement('audio');
	}catch(ex){
		return false;
	}
	return !!(a.canPlayType && a.canPlayType('audio/mp3').replace(/no/, ''));
}

function hasH5mp4(){
	try{
		var v=document.createElement('video');
	}catch(ex){
		return false;
	}
	return !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ''));
}

function getStyle(obj,styleProp){
	if(obj.currentStyle){
		var val=obj.currentStyle[styleProp];
	}else if(window.getComputedStyle){
		var val=document.defaultView.getComputedStyle(obj,null).getPropertyValue(styleProp);
	}
	return val;
}

function insertAfter(newElement,targetElement) {
	var parent=targetElement.parentNode;
	if(parent.lastchild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

var eventSupported = (function(){
	var TAGNAMES = {
		'select':'input','change':'input',
		'submit':'form','reset':'form',
		'error':'img','load':'img','abort':'img'
	}
	function eventSupported(eventName) {
		var el = document.createElement(TAGNAMES[eventName] || 'div');
		eventName = 'on' + eventName;
		var isSupported = (eventName in el);
		if (!isSupported) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] == 'function';
		}
		el = null;
		return isSupported;
	}
	return eventSupported;
})();

function quotemeta(str) {
  return (str+'').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}

function htmlspecialchars(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>\"\']/g, function(m) { return map[m]; });
}

/* fades */
// Note: fade objects must have an ID

var tl_faders=new Array();

function fadeIn(obj){
	var oid=obj.id;
	if(!oid){
		alert("Object must have an ID to fade");
		return false;
	}
	if(!tl_faders[oid]){
		var delay=(arguments.length>1?arguments[1]:20);
		var duration=delay*10;
		var disp=(arguments.length>2?arguments[2]:false);
		var op_final=(arguments.length>3?arguments[3]:1);
		tl_faders[oid]=new Fader(obj,{duration:duration,disp:disp,op_final:op_final});
	}
	tl_faders[oid].fadeIn();
}

function fadeOut(obj){
	var oid=obj.id;
	if(!oid){
		alert("Object must have an ID to fade");
		return false;
	}
	if(!tl_faders[oid]){
		var delay=(arguments.length>1?arguments[1]:20);
		var duration=delay*10;
		var disp=(arguments.length>2?arguments[2]:false);
		var op_final=(arguments.length>3?arguments[3]:1);
		tl_faders[oid]=new Fader(obj,{duration:duration,disp:disp,op_final:op_final});
	}
	tl_faders[oid].fadeOut();
}

_tlutil.Fader=function(obj,args){
	this.oFade=obj;
	this.oFadeTmr=0;
	this.oDisplay=args.disp;
	this.duration=args.duration;
	this.oFadeDelay=20;
	this.op_final=args.op_final||1;
	this.opacity_support='opacity' in document.body.style;
	tl_faders[obj.id]=obj;
}

_tlutil.Fader.prototype={

	fadeIn: function(){
		this.fadeEnd=new Date().getTime()+this.duration;
		if(this.opacity_support){
			this.oFade.style.opacity=0;
		}else{
			this.oFade.style.filter="alpha(opacity=0)";
		}
		if(this.oDisplay){
			this.oFade.style.display=this.oDisplay;
		}else{
			this.oFade.style.visibility='visible';
		}
		this.fadeInDo();
	},
	
	fadeInDo: function(){
		var me=this;
		var now=new Date().getTime();
		if(now<this.fadeEnd){
			var op=this.op_final*(now - this.fadeEnd + this.duration) / this.duration;
			//var op=this.oFadeInc/10;
			if(this.opacity_support){
				this.oFade.style.opacity=op;
			}else{
				this.oFade.style.filter="alpha(opacity="+Math.round(op*100)+")";
			}
			this.oFadeTmr=setTimeout(function(){me.fadeInDo()},this.oFadeDelay);
		}else{
			if(this.opacity_support){
				this.oFade.style.opacity=this.op_final;
			}else{
				if(this.op_final==1){
					this.oFade.style.filter="";
				}else{
					this.oFade.style.filter="alpha(opacity="+Math.round(this.op_final*100)+")";
				}
			}
		}
	},
	
	fadeOut: function(){
		this.fadeEnd=new Date().getTime()+this.duration;
		this.fadeOutDo();
	},
	
	fadeOutDo: function(){
		var me=this;
		var now=new Date().getTime();
		if(now<this.fadeEnd){
			//var op=(now - this.fadeEnd) / this.duration;
			var op=1-(now - this.fadeEnd + this.duration) / this.duration;
			op=op*this.op_final;
			if(this.opacity_support){
				this.oFade.style.opacity = op;
			}else{
				this.oFade.style.filter = "alpha(opacity="+Math.round(op*100)+")";
			}
			this.oFadeTmr=setTimeout(function(){me.fadeOutDo()},this.oFadeDelay);
		}else{
			if(this.opacity_support){
				this.oFade.style.opacity=0;
			}else{
				this.oFade.style.filter="alpha(opacity=0)";
			}
			if(this.oDisplay){
				this.oFade.style.display='none';
			}else{
				this.oFade.style.visibility='hidden';
			}
		}
	}
	
};
