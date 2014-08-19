module.exports = {
  //配置项: 配置值
  port: 80, //监听的端口
  app_group_list: ['Home', 'Admin'], //分组列表

  //模版引擎相关的配置
  tpl_content_type: "text/html", //模版输出时发送的Content-Type头信息
  tpl_file_suffix: ".html", //模版文件名后缀
  tpl_file_depr: "_", //controller和action之间的分隔符
  tpl_engine_type: "swig", //模版引擎名称
  tpl_engine_config: {}, //这里定义模版引擎需要的一些额外配置，如：修改左右定界符

  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '', // 端口
  db_name: 'autobots', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '123456', // 密码
  db_prefix: 'autobots_', // 数据库表前缀
};
