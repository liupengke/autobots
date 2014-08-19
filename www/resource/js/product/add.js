function getSubclass(){
	var form = $('#productForm'),
		id = form[0].cid.value,
		domSubclass = form.find('select[name=subcid]');
	domSubclass.html('<option value="-1">...uncategory...</option>');
	if(id<1) {
		return;
	};
	
	$.get('/admin/product/subclass',{id: id}, 'json').then(function(data){
		var html = '';
		if(!data.errno && data.data.list){
			data.data.list.forEach(function(scls){
				html += '<option value="'+scls.id+'">'+scls.name+'</option>';
			})
		}
		domSubclass.html(html);
	});
}
function initEvent(){
	$('#productForm select[name=cid]').change(getSubclass)
}
$(function(){
	getSubclass();
	initEvent();
})