var settings = require('../settings');
var mongodb = require('mongodb');
var server = mongodb.Server(settings.host, settings.port, {});

module.exports = new mongodb.Db(settings.db, server, {safe: true});

