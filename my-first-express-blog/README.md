# My First Express Blog

> 多人博客搭建NodeJS + Express + MongoDB，暂时还没搞懂部署这块儿无法直接访问

```bash
# 安装express命令行工具
npm install -g express-generator

# 初始化express项目并安装所需模块
express -e my-first-express-blog
cd my-first-express-blog
npm install

# 启动项目，访问localhost:3000
npm start
```

* 刚开始接触NodeJS遇到的一些库：

  bower: front-end package management; [bower VS npm](https://segmentfault.com/q/1010000002855012)

  ejs, Jade:  Template engine

  generator: Express' application generator

  Morgan: HTTP request logger middleware for node.js

  body-parser: Node.js body parsing middleware

  express-session: session middleware for Express

  connect-mongo: MongoDB session store for Express and Connect

  connect-flash: flash 是一个在 session 中用于存储信息的特定区域。信息写入 flash ，下一次显示完毕后即被清除。闪存是用于存储消息的会话的特殊区域。 消息写入闪存并在向用户显示后清除。 闪存通常与重定向结合使用，确保消息可用于要呈现的下一页。

  crypto: 生成散列值来加密密码

  ​

* 工程目录：

  ```
  app.js：启动文件，或者说入口文件

  package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install ，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块

  node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下

  public：存放 image、css、js 等文件

  routes：存放路由文件

  views：存放视图文件或者说模版文件

  bin：存放可执行文件
  ```

* express封装的http请求方式，app.get()和app.post()，第一个参数为请求路径，第二个参数为处理请求回调函数

  ```
  app.get('/', function(req, res){
    //req 请求信息
    //res 响应信息
  })
  ```

  获取请求路径：

  ```
  req.query ： 处理 get 请求，获取 get 请求参数
  req.params ： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
  req.body ： 处理 post 请求，获取 post 请求体
  req.param() ： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query
  ```

* 发现express每次修改文件都需要重启服务，相比较webpack的热加载简直太不方便了，express实现**热部署**解决方法：

  ```
  npm install -g node-dev
  node-dev ./bin/www
  ```

* **模板引擎**的功能是将页面模板和要显示的数据结合起来生成 HTML 页面。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端。

  ```
  //指定使用哪个模板引擎 app.js
  app.set('view engine', 'ejs');

  //渲染模板 routes/index.js
  res.render()接受两个参数，第一个是模板的名称，即 views 目录下的模板文件名，扩展名 .ejs 可选。第二个参数是传递给模板的数据对象，用于模板翻译。
  ```

  ejs标签：

  ```
  <% code %>：JavaScript 代码。
  <%= code %>：显示替换过 HTML 特殊字符的内容。
  <%- code %>：显示原始 HTML 内容。
  ```

* 静态文件目录设置为public，所以`href='/stylesheets/style.css'` 就相当于 `href='public/stylesheets/style.css'`

* **[node-mongodb-native](https://github.com/mongodb/node-mongodb-native)**是mongodb的nodejs驱动，针对它再次封装的工具有**mongoose**等。安装node-mongodb-native，```npm install mongodb```，也可以在package.json中添加mongodb，然后npm install更新依赖。

  ```
  // 看文档里是通过初始化一个mongoClient实例来操作mongodb，这里用另一种写法：

  var mongodb = require('mongodb');
  var settings = {
  	db: 'myblog',
  	col: 'user',
  	host: 'localhost',
  	port: 27017
  }
  var server = mongodb.Server(settings.host, settings.port, {});
  new mongodb.Db(settings.db, server, {}).open(function(err, db){
  	if(err) throw err;
  	var col = db.collection(settings.col);
  	col.find(function(err, docs){
  		docs.each(function(err, doc){
  			if(doc){
  				console.log('name:' + doc.name + " pwd:" + doc.pwd);
  			}
  		})
  	})
  })
  ```

* 用户注册实现思想：借助[flash](http://yunkus.com/connect-flash-usage/)实现即时信息显示，借助md5实现密码加密，User对象提供get方法检查用户名是否存在，save方法将user信息存入数据库&&更新req.session（会话存储），各种回调函数嵌套的写法也很赞。

* 页面权限控制实现思想：比如已登录用户不可以访问'/reg'和'/login'，未登录用户不可以访问'/publish'和'logout'。把用户登录状态的检查放到路由中间件中，在每个路径前增加路由中间件，在这个中间件中通过next()转移控制权。

* 一个给博客提供评论功能的插件：[多说](http://duoshuo.com/)

* 一个从键入字符中建议搜索结果的jQuery插件：[Typeahead](http://twitter.github.io/typeahead.js/)

  ​