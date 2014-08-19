/**
 	 * controller
 	 * @return 
 	 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
    		this.display();
    	},
        aboutAction: function(){
            var self = this;
            var isEdit = false;
            function dis(){
                self.assign('isEdit', isEdit);
                D('Aboutus').field(['id', 'title']).select().then(function(data){
                    self.assign('tabList', data);
                    var id = self.get('id');
                    if(!id)
                        id = data[0].id;
                    D('Aboutus').where({id: id}).find().then(function(tabData){
                        self.assign('curTab', tabData);
                        self.display();
                    })
                });
            }
            if(this.get('isEdit')=="1"){
                return this.session("userInfo").then(function(data){
                    if(isEmpty(data)){
                        dis(); 
                    }else{
                        isEdit = true;
                        dis();
                    }
                })
            }else{
                dis();
            }
            
        }
	};
});