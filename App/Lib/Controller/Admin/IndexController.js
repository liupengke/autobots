module.exports = Controller("Admin/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
    		var self = this;
      		return this.session('userInfo').then(function(data){
      			if(isEmpty(data)){
      				return self.redirect('/admin/index/login');
      			}else{
      				self.userInfo = data;
      				self.assign('userInfo', data);
      				self.display();
      			}
      		})
    	},
    	loginAction: function(){
    		if(this.isGet())
    			this.display();
    		else{
    			var name = this.post('username'),
    				password = this.post('pswd'),
    				self = this;
    			return D('User').where({
    				name: name,
    				password: md5(password)
    			}).find().then(function(data){
    				if(isEmpty(data)){
    					return self.error(1001, 'login error');
    				}else{
    					return self.session('userInfo', data);
    				}
    			}).then(function(){
    				return self.success();
    			});
    		}
    	},
      aboutAction: function(){
        this.assign('pageType', 'about');
        D('Aboutus').find().then(function(data){
          console.log(data);
        });
        this.display();
      }
	};
});