module.exports = Controller("Admin/BaseController", function(){
	"use strict";
  	return {
    	indexAction: function(){
            var self = this,
                search = {},
                keyword = this.param('kw'),
                cid = this.param('cid'),
                subcid = this.param('subcid'),
                order = this.param('order');

            if(keyword && keyword.trim()){
                search.name = ['like', '%'+keyword.trim()+'%'];
            }
            if(cid && parseInt(cid, 10)>0){
                search.cid = cid;
            }
            if(subcid && parseInt(subcid, 10)>0){
                search.subcid = subcid;
            }

            D('Class').where(search).select().then(function(data){
                self.assign('classList', data);
                self.assign('keyword', keyword);
                self.assign('cid', cid);
                self.assign('subcid', subcid);
                self.assign('order', order);
                D('Product').where(search).order('time '+(order=="asc" ? 'ASC' : 'DESC')).select().then(function(list){
                    self.assign('list', list);
                    if(subcid && parseInt(subcid, 10)>0){
                        D('Subclass').where({pid: subcid}).select().then(function(subList){
                            self.assign('subList', subList);
                            self.display();
                        });
                    }
                    else
                        self.display();
                });
            });            
    	},
    	addAction: function(){
    		var self = this;
            D('Class').select().then(function(data){
                self.assign('classList', data);

                self.display();
            });
    	},
        addproductAction: function(){
            var msg,
                self = this,
                id = this.post('id');
            if(!this.post('cid')){
                msg = 'no category select';
            }
            if(!this.post('subcid')){
                msg = 'no sub-category selected';
            }
            if(!this.post('name')){
                msg = 'must have a name!';
            }
            if(msg){
                this.assign('msg', msg);
                this.display('admin/product_add_fail.html');
            }
            else{
                var d = new Date();
                var item = {
                    cid: this.post('cid'),
                    subcid: this.post('subcid'),
                    name: this.post('name'),
                    brand: this.post('brand') || '',
                    model: this.post('model') || '',
                    mnumber: this.post('mnumber') || '',
                    size: this.post('size') || '',
                    weight: this.post('weight') || '',
                    battery: this.post('battery') || '',
                    atomizer: this.post('atomizer') || '',
                    voltage: this.post('voltage') || '',
                    color: this.post('color') || '',
                    payment: this.post('payment') || '',
                    desc: this.post('desc') || '',
                    time: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
                };
                if(id){
                    D('Product').where({id: id}).update(item).then(function(count){
                        var url = '/admin/addphoto?isEdit=1&id='+id;
                        self.redirect(url);
                    })
                }else{
                    D('Product').add(item).then(function(_id){
                        var url = '/admin/addphoto?id='+_id;
                        self.redirect(url);  
                    })
                }
            }
        },
        addPhotoAction: function(){
            var id = this.post('id'),
                isEdit = this.post('isEdit'),
                self = this;
            this.assign('isEdit', isEdit? true: false);
            D('Product').where({id: id}).find().then(function(data){
                data.photo = JSON.parse(data.photo);
                self.assign('product', data);
                self.display();
            });
        },
        delproductAction: function(){
            var id = this.param('id');
            var self = this;
            D('Product').where({id:id}).delete().then(function(count){
                if(count)
                    self.success();
                else
                    self.fail(1001, 'delete error');
            });
        },
        editAction: function(){
            var id = this.param('id');
            var self = this;
            D('Product').where({id: id}).find().then(function(product){
                self.assign('isEdit', true);
                console.log(product)
                self.assign('product', product);
                D('Class').select().then(function(data){
                    self.assign('classList', data);

                    if(product.cid){
                        D('Subclass').where({pid: product.cid}).select().then(function(list){
                            self.assign('subList', list);
                            self.display('Admin/product_add.html');
                        });
                    }else{
                        self.display('Admin/product_add.html');
                    }
                });

            });
        },
    	catAction: function(){
    		var self = this;
    		D('Class').select().then(function(data){
    			self.assign('list', data);

    			self.display();
    		});
    	},
    	addcatAction: function(){
    		if(!this.post('name')) this.error();
    		var self = this;
    		D('Class').add({
    			name: this.post('name'),
    			hot: this.post('hot')=='yes' ? 1 : 0
    		}).then(function(){
    			self.success();
    		})
    		return this.success();
    	},
        editcatAction: function(){
            var self = this,
                id = this.post('id'),
                name = this.post('name'),
                hot = this.post('hot')=='yes' ? 1 : 0;
            D('Class').where({id:id}).update({
                name: name,
                hot: hot
            }).then(function(count){
                if(count)
                    self.success();
                else
                    self.error(1003, 'fail');
            });
        },
        delcatAction: function(){
            var self = this,
                id = this.post('id');
            D('Class').where({id: id}).delete().then(function(count){
                if(count)
                    self.success();
                else
                    self.error(1003, 'fail');
            });
        },
        subcatAction: function(){
            var id=this.get('id'),
                self = this;
            if(!id){
                self.redirect('/admin/product/cat');
            }
            return D('Class').where({id: id}).find().then(function(data){
                if(data && data.id){
                    self.assign('cat', data);
                    return D('Subclass').where({pid: id}).select().then(function(list){
                        self.assign('list', list);
                        self.display();
                    });
                }else{
                    self.redirect('/admin/product/cat');
                }
            })
        },
        addsubcatAction: function(){
            if(!this.post('name') || !this.post('pid')) this.error();
            var self = this;
            D('Subclass').add({
                name: this.post('name'),
                hot: this.post('hot')=='yes' ? 1 : 0,
                pid: this.post('pid')
            }).then(function(){
                self.success();
            })
            return this.success();
        },
        editsubcatAction: function(){
            var self = this,
                id = this.post('id'),
                name = this.post('name'),
                hot = this.post('hot')=='yes' ? 1 : 0;
            D('Subclass').where({id:id}).update({
                name: name,
                hot: hot
            }).then(function(count){
                if(count)
                    self.success();
                else
                    self.error(1003, 'fail');
            });
        },
        delsubcatAction: function(){
            var self = this,
                id = this.post('id');
            D('Subclass').where({id: id}).delete().then(function(count){
                if(count)
                    self.success();
                else
                    self.error(1003, 'fail');
            });
        },
        subclassAction: function(){
            var id = this.get('id'),
                self = this;
            if(!id) this.error('1001');
            D('Subclass').where({pid: id}).select().then(function(list){
                self.success({
                    list: list
                })
            });
        },
        uploadAction: function(){
            var self = this,
                productId = this.post('productId'),
                targetDir = 'upload_tmp',
                uploadDir = 'upload',
                fs = require('fs'),
                util = require('util'),
                file = this.file('file'),
                targetPath = __dirname+'/../../../../www/resource/img/pimg/';
            var fname = file.originalFilename;
            var writeStream = fs.createWriteStream(targetPath+fname);
            var readStream = fs.createReadStream(file.path);
            readStream.pipe(writeStream);
            readStream.on('end', function(){
                D('Product').where({id: productId}).find().then(function(item){
                    var photos = JSON.parse(item.photo || '[]');
                    if(photos.indexOf(fname)<0){
                        photos.push(fname);
                    }
                    D('Product').where({id: productId}).update({
                        photo: JSON.stringify(photos)
                    }).then(function(){
                        self.success();
                    })    
                });
            })
            
            
            
        },
        photodoneAction: function(){
            this.assign('productId', this.get('id'));
            this.display('Admin/product_add_suc.html');
        },
        photoeditAction: function(){
            var id = this.post('productId'),
                op = this.post('op'),
                index = parseInt(this.post('index'), 10),
                self = this;

            D('Product').where({id: id}).find().then(function(data){
                var photos = JSON.parse(data.photo);
                if(op == 'forward'){
                    if(index !=0){
                        var img = photos[index-1];
                        photos[index-1] = photos[index];
                        photos[index] = img;
                    }
                }else if(op=='afterward'){
                    if(index+1<photos.length){
                        var img = photos[index+1];
                        photos[index+1] = photos[index];
                        photos[index] = img;
                    }
                }else if(op=='del'){
                    photos.splice(index, 1);

                }
                D('Product').where({id: id}).update({
                    photo: JSON.stringify(photos)
                }).then(function(){
                    self.success({photos: photos});
                })
            });
        }
	};
});