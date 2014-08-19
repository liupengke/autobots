module.exports = Controller("Admin/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
    		var self = this;
    		D('Aboutus').select().then(function(data){
    			self.assign('titleList', data);
    			self.display();
    		});
    	},
        editAction: function(){
            var self = this;
            if(this.isPost()){
                var id = this.post('id');
                if(id){
                    D('Aboutus').where({
                        id: id
                    }).update({
                        content: self.post('content')
                    }).then(function(count){
                        if(count){
                            self.success();
                        }else{
                            this.error('1004', 'modify failed!');
                        }
                    });
                }else{
                    this.error('1003', 'id is not exist!');
                }
            }else{
                this.error('1002', 'request type is error!');
            }
        },
    	addAction: function(){
    		var self = this;
    		if(this.isPost()){
    			var title = this.post('title');
    			if(title){
    				D('Aboutus').count().then(function(count){
    					D('Aboutus').add({
    						title: title
    					}).then(function(data){
    						self.success();
    					})
    				});
    			}else{
    				this.error('1003', 'title is empty!');
    			}
    		}else{
    			this.error('1002', 'request type is error!');
    		}
    	},
    	delAction: function(){
    		var self = this;
    		if(this.isPost()){
    			var id = this.post('id');
    			if(id){
    				D('Aboutus').where({id:id}).delete().then(function(count){
    					if(!count)
    						self.error('1004', 'title is not exist!');
    					else{
    						self.success();
    					}
    				});
    				
    			}else{
    				this.error('1003', 'id is empty!');
    			}
    		}else{
    			this.error('1002', 'request type is error!');
    		}
    	},
    	upAction: function(){
    		var self = this;
    		if(this.isPost()){
    			var id = this.post('id');
    			if(id){
    				D('Aboutus').where({id: id}).find().then(function(curData){
    					if(!curData || !curData.id){
    						self.error('1004', 'title is not exist!');
    					}else{

    						D('Aboutus').where('id<'+id).max('id').then(function(preId){
    							if(preId){
    								D('Aboutus').where({id: preId}).find().then(function(preData){
    									D('Aboutus').where({id: curData.id}).update({
    										title: preData.title,
    										content: preData.content
    									}).then(function(){
    										D('Aboutus').where({id: preData.id}).update({
	    										title: curData.title,
	    										content: curData.content
	    									}).then(function(){
	    										self.success();
	    									});
    									});
    								});
    							}else
    								self.success();
    						})
    					}
    				});
    				
    			}else{
    				this.error('1003', 'id is empty!');
    			}
    		}else{
    			this.error('1002', 'request type is error!');
    		}
    	},
    	downAction: function(){
    		var self = this;
    		if(this.isPost()){
    			var id = this.post('id');
    			if(id){
    				D('Aboutus').where({id: id}).find().then(function(curData){
    					if(!curData || !curData.id){
    						self.error('1004', 'title is not exist!');
    					}else{

    						D('Aboutus').where('id>'+id).min('id').then(function(nextId){
    							if(nextId){
    								D('Aboutus').where({id: nextId}).find().then(function(nextData){
    									D('Aboutus').where({id: curData.id}).update({
    										title: nextData.title,
    										content: nextData.content
    									}).then(function(){
    										D('Aboutus').where({id: nextData.id}).update({
	    										title: curData.title,
	    										content: curData.content
	    									}).then(function(){
	    										self.success();
	    									});
    									});
    								});
    							}else
    								self.success();
    						})
    					}
    				});
    				
    			}else{
    				this.error('1003', 'id is empty!');
    			}
    		}else{
    			this.error('1002', 'request type is error!');
    		}
    	}
	};
});