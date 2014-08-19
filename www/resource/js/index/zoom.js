require(['../lib/jquery'],function(_){
	var img = new Image(),
		url = $('.main-info .img img').data('big');
	img.onload = function(){
		var SIZE = 378,
			PAD_SIZE = 190,
			ZOOM_SIZE = 300;
		var w = img.width,
			offset = $('.main-info .img').offset(),
			left = offset.left,
			top = offset.top;
		var dimg = $('.zoomin img').attr('src', url),
			pad = $('.zoom-pad');
		$('.main-info .img').on('mouseenter', function(){
			pad.show();
			$('.zoomin').show();
		}).on('mouseleave', function(){
			pad.hide();
			$('.zoomin').hide();
		}).on('mousemove', function(e){
			var x = e.pageX - left - 4,
				y = e.pageY - top -4;

			x = Math.min(Math.max(0, x), 300);
			y = Math.min(Math.max(0, y), 300);

			var px = Math.min(Math.max(0, x - PAD_SIZE/2), SIZE - PAD_SIZE),
				py = Math.min(Math.max(0, y - PAD_SIZE/2), SIZE - PAD_SIZE);
			pad.css({
				left: px+'px',
				top: py+'px'
			});

			var dx = x/SIZE*w,
				dy = y/SIZE*w;

			dx = Math.min(Math.max(0, dx - ZOOM_SIZE/2), w - ZOOM_SIZE);
			dy = Math.min(Math.max(0, dy - ZOOM_SIZE/2), w - ZOOM_SIZE);

			dimg.css({
				left: -dx+'px',
				top: -dy+'px'
			});
		});
	};

	img.src = url;
});