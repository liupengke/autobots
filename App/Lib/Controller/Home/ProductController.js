module.exports = Controller("Home/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
      		this.display();
    	},
    	productAction: function(){
    		var id = this.param('id'),
    			self = this;
    		D('Product').where({id: id}).find().then(function(data){
    			data.photo = JSON.parse(data.photo);
    			self.assign('product', data);
    			self.display();
    		});
    	}
	};
});