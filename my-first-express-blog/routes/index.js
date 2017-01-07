/*
* 生成一个路由实例用来捕获访问主页的GET请求，
* 导出这个路由并在app.js中通过app.use('/', routes); 加载。
* 这样，当访问主页时，就会调用res.render('index', { title: 'Express' });
* 渲染views/index.ejs模版并显示到浏览器中
* 在渲染模板时我们传入了一个变量 title 值为 express 字符串，
* 模板引擎会将所有 <%= title %> 替换为 express ，然后将渲染后生成的html显示到浏览器中
*/
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


//new
var crypto = require('crypto');
var User = require('../models/user.js');
var Publish = require('../models/publish.js');

function checkNotLogin(req, res, next){
	if(!req.session.user){
		req.flash('error', '未登录！');
		res.redirect('/');
	}
	next();//可以执行相同路径的下一个方法
}
function checkLogin(req, res, next){
	if(req.session.user){
		req.flash('error', '已登录！');
		res.redirect('/');
		// res.redirect('back');//返回之前的页面
	}
	next();//可以执行相同路径的下一个方法
}


module.exports = function(app){
	app.get('/', function(req, res){
		Publish.get(null, function(err, pubs){
			if(err) pubs = {};
			res.render('index', {
				title: 'Home', 
				user: req.session.user,
				pubs: pubs,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		})
	});
	//register
	app.get('/reg', checkLogin);
	app.get('/reg', function(req, res){
		res.render('reg', {
			title: 'Register',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/reg', checkLogin);
	app.post('/reg', function (req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		if(!name || !password){
			req.flash('error', '注册失败');
			return res.redirect('/');
		}
		//检验用户两次输入的密码是否一致
		if (password_re != password) {
			req.flash('error', '两次输入的密码不一致!'); 
			return res.redirect('/');//返回注册页
		}
		//生成密码的 md5 值
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: name,
			password: password,
			email: req.body.email
		});
		//检查用户名是否已经存在 
		User.get(newUser.name, function (err, user) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			if (user) {
				req.flash('error', '用户已存在!');
				return res.redirect('/');//返回注册页
			}
			//如果不存在则新增用户
			newUser.save(function (err, user) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/reg');//注册失败返回主册页
				}
				req.session.user = user;//用户信息存入 session
				req.flash('success', '注册成功!');
				res.redirect('/');//注册成功后返回主页
			});
		});
	});
	//login
	app.get('/login', checkLogin);
	app.get('/login', function(req, res){
		res.render('login', {
			title: 'Login',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/login', checkLogin);
	app.post('/login', function(req, res){
		var md5 = crypto.createHash('md5'),
			pwd = md5.update(req.body.password).digest('hex');
		User.get(req.body.name, function(err, user){
			if(!user){
				req.flash('error', '用户不存在或密码有误');
				return res.redirect('/');
			}
			if(user.password != pwd){
				req.flash('error', '密码错误！');
				return res.redirect('/');
			}
			req.session.user = user;
			req.flash('success', '登录成功！');
			return res.redirect('/');
		})
	});
	//publish
	app.get('/publish', checkNotLogin);
	app.get('/publish', function(req, res){
		res.render('publish', {
			title: 'Publish',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/publish', checkNotLogin);
	app.post('/publish', function(req, res){
		var curUser = req.session.user;
		var publish = new Publish(curUser.name, req.body.title, req.body.publish);
		publish.save(function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('/');
			}
			req.flash('success', '发布成功！');
			res.redirect('/');
		})
	});
	//logout
	app.get('/logout', checkNotLogin);
	app.get('/logout', function(req, res){
		req.session.user = null;
		req.flash('success', '登出成功！');
		res.redirect('/');
	});

	//test
	app.get('/kad', function(req, res){
		res.send('Hello KAD!');
	});
}