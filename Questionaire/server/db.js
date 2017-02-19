const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questionaire');

mongoose.connection.on('error', err=>{console.log('Mongo connection error:' + err);});
mongoose.connection.once('open', ()=>{console.log('Mongo connection succeed');});

const userSchema = mongoose.Schema({
	account: String,
	password: String
});

const Models = {
	User: mongoose.model('user', userSchema)
}

module.exports = Models;