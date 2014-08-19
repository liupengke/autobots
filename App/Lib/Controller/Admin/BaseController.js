module.exports = Controller(function(){
	"use strict";
  	return {
    	init: function(http){
    		this.super("init", http); //调用父级的init方法，并将http作为参数传递过去
            //login请求不判断当前是否已经登录
            if(http.action === 'login'){
                return;
            }
            //通过获取session判断是否已经登录
            var self = this;
            return this.session("userInfo").then(function(data){
                if(isEmpty(data)){
                    //如果未登录跳转到登录页。由于redirect方法返回的是个pendding promise，那么后面的action方法并不会被执行
                    return self.redirect("/admin/index/login"); 
                }else{
                    //设置后，后面的action里直接通过this.userInfo就可以拿到登录用户信息了
                    self.userInfo = data;
                }
            })
    	}
	};
});