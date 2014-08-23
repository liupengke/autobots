function getSubclass(){
	var id = $('select[name=cid]')[0].value,
		domSubclass = $('select[name=subcid]');
	domSubclass.html('<option value="-1">all</option>');
	if(id<1) {
		return;
	};
	
	$.get('/admin/product/subclass',{id: id}, 'json').then(function(data){
		var html = '<option value="-1">all</option>';
		if(!data.errno && data.data.list){
			data.data.list.forEach(function(scls){
				html += '<option value="'+scls.id+'">'+scls.name+'</option>';
			})
		}
		domSubclass.html(html);
	});
}
function initEvent(){
	$('select[name=cid]').change(getSubclass);

	$('#pList').delegate('.p-del', 'click', function(){
		var tr = $(this).parents('tr');
			id = tr.data('id');
		$.post('/admin/product/delproduct', {id: id}, function(data){
			if(data.errno==0)
				tr.remove();
			else
				alert('delete failed!');
		}, 'json');
	});
}
$(function(){
	initEvent();
})