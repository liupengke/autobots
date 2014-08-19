define(['../lib/jquery'], function(_){
	var curHotIndex = 0,
		hotItems,
		eUl,
		eListWrap;
	function moveHot(index){
		var windowSize = Math.floor(eListWrap.width()/252);
		if(index<0) index = hotItems.length-1 - windowSize;
		if(index+windowSize>=hotItems.length) index=0;

		eUl.css('left', -252*index+'px');
		curHotIndex = index;
	}
	function init(){
		hotItems = $('.hot-list-wrap li');
		eUl = $('.hot-list ul');
		eListWrap = $('.hot-list-wrap');
		$('.hot-list ul').css('width', (252*hotItems.length)+'px');

		$('.hot-list .hot-pre').click(function(){
			moveHot(curHotIndex-1);
		});
		$('.hot-list .hot-next').click(function(){
			moveHot(curHotIndex+1);
		});
	}

	return {
		init: init
	}
});