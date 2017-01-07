var mongodb = require('./db');

function Publish(name, title, doc){
	this.name = name;
	this.title = title;
	this.doc = doc
}

module.exports = Publish;

Publish.prototype.save  = function(callback){
	var date = new Date();
	//存储各种时间格式，方便以后扩展
	var time = {
		date: date,
		year : date.getFullYear(),
		month : date.getFullYear() + "-" + (date.getMonth() + 1),
		day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
		date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
	}
	var publish = {
		name: this.name,
		time: time,
		title: this.title,
		doc: this.doc
	}
	mongodb.open(function(err, db){
		if(err) return callback(err);
		db.collection('publishs', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(publish, {
				safe: true,
			},function(err){
				mongodb.close();
				if(err) return callback(err);
				callback(null);//返回 err 为 null
			})
		})
	})
}

Publish.get = function(name, callback){
	mongodb.open(function(err, db){
		if(err) callback(err);
		db.collection('publishs', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if(name) query.name = name;
			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs){
				mongodb.close();
				if(err) return callback(err);
				callback(null, docs);//成功！以数组形式返回查询的结果
			})
		})
	})
}