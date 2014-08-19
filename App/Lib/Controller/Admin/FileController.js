module.exports = Controller("Admin/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
    		this.error();
    	},
        browserAction: function(){
            var fs = require('fs');
            var self = this;
            /*
            fs.realpath('.', function (err, resolvedPath) {
              if (err) throw err;
              console.log(resolvedPath);
            });*/
            fs.readdir('./www/resource/img/system', function(err, files){
                console.log(err);
                if (err){
                    self.error();
                    throw err;}
                self.assign('funcNum', self.get('CKEditorFuncNum'));
                self.assign('imageList', files);
                self.display();
            });
        }
	};
});