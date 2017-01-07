//通过require()加载了express、path 等模块,以及 routes 文件夹下的index. js和 users.js 路由文件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');//new
// var users = require('./routes/users');

var settings = require('./settings');//new
var flash = require('connect-flash');//new

var app = express();//实例化express

// app.set('port', process.env.PORT || 3000);//new
// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放模板文件的地方
app.set('view engine', 'ejs');//设置模板引擎为ejs
app.use(flash());//new

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//设置favicon图标
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件
app.use(cookieParser());//加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录

// app.use('/', index);
// app.use('/users', users);

// //new
// app.listen(app.get('port'), function(){
// 	console.log('Express server listening on port ' + app.get('port'));
// })

// catch 404 and forward to error handler
//捕获404错误，并转发到错误处理器
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
//开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//new
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
	secret: settings.cookieSecret,
	key: settings.db, //cookie name
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30days
	store: new MongoStore({
		db: settings.db,
		host: settings.host,
		port: settings.port,
		url: 'mongodb://localhost:27017/myblog'
	})
}));


//路由控制器
routes(app);//new

module.exports = app;
