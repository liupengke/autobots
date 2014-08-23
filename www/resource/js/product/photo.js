var tplFun = $('#tpl').html().tmpl();
function reload(list){
	var html = tplFun({list: list});
	$('.photo-list').html(html);
}
$(function(){
	$('.photo-list')
		.delegate('.op-forward', 'click', function(){
			var index = $(this).parents('li').data('index');
			$.post('/admin/product/photoedit',{
				productId: SYS_CONF.productId,
				op: 'forward',
				index: index
			},function(data){
				if(data.errno==0){
					reload(data.data.photos);
				}else{
					location.href="/admin/";
				}
				$('.loading-mask').fadeOut();
			}, 'json');
			$('.loading-mask').show();
		})
		.delegate('.op-afterward', 'click', function(){
			var index = $(this).parents('li').data('index');
			$.post('/admin/product/photoedit',{
				productId: SYS_CONF.productId,
				op: 'afterward',
				index: index
			},function(data){
				if(data.errno==0){
					reload(data.data.photos);
				}else{
					location.href="/admin/";
				}
				$('.loading-mask').fadeOut();
			}, 'json');
			$('.loading-mask').show();
		})
		.delegate('.op-del', 'click', function(){
			var index = $(this).parents('li').data('index');
			$.post('/admin/product/photoedit',{
				productId: SYS_CONF.productId,
				op: 'del',
				index: index
			},function(data){
				if(data.errno==0){
					reload(data.data.photos);
				}else{
					location.href="/admin/";
				}
				$('.loading-mask').fadeOut();
			}, 'json');
			$('.loading-mask').show();
		});

	if(photos){
		reload(photos);
	}
});