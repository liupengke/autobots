require(
[
	'hot-list'
], function(hotList) {
		var slides = $('.slide .slide-item'),
			slideBtns = $('.slide button'),
			curSlideIndex = 0,
			duration = 5000,
			timeoutId;
		function slideChange(index){
			clearTimeout(timeoutId);
			if(typeof index=='undefined')
				index = curSlideIndex+1;
			if(index >= slides.length)
				index=0;
			$(slides[curSlideIndex]).removeClass('slide-cur-item');
			$(slides[index]).addClass('slide-cur-item');
			$(slideBtns[curSlideIndex]).removeClass('cur-slide-btn');
			$(slideBtns[index]).addClass('cur-slide-btn');
			curSlideIndex = index;
			timeoutId = setTimeout(slideChange, duration);
		}
		slideBtns.click(function(){
			slideChange(parseInt($(this).data('index')));
		});
		timeoutId = setTimeout(slideChange, duration);

		hotList.init();
});