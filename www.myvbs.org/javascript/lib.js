addEvent(window,'load',cStatusMessage,false);

var cmsg_timer=0;
function cStatusMessage(){
	if(document.cookie.match(/\bsmsg=([^;]+)/)){
		var msg=unescape(RegExp.$1);
		document.cookie='smsg=; path=/; expires=Sat, 01-Jan-2000 00:00:00 GMT';
		if(msg=='') return;
		var mdiv=document.createElement('div');
		mdiv.id='dialog_overlay';
		mdiv.innerHTML='<div id="general_dialog" class="dialog">'+
			'<h4>Status</h4>'+
			'<p>'+msg+'</p>'+
			'<a class="cancel" href="javascript:void(0)" onclick="cStatusMessageClose(\'\')">OK</a>'+
			'<a class="done btn" href="javascript:void(0)" onclick="cStatusMessageClose(\'\')">OK</a>'+
		'</div>';
		document.body.appendChild(mdiv);
		fadeIn(mdiv);
		cmsg_timer=setTimeout('cStatusMessageClose()',3000);
	}
}

function cStatusMessageClose(){
	clearTimeout(cmsg_timer);
	fadeOut($('dialog_overlay'));
}

