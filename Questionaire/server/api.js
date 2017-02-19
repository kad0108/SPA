"use strict";

const models = require('./db');
const express = require('express');
const router = express.Router();

router.post('/api/login/createAccount', (req, res)=>{
	let newAccount = new models.User({
		account: req.body.account,
		password: req.body.password
	});
	newAccount.save((err, data)=>{
		if(err) res.send(err);
		else res.send('CreateAccount Succeed');
	})
})

router.get('/api/login/getAccount', (req, res)=>{
	models.User.find((err, data)=>{
		if(err) res.send(err);
		else res.send(data);
	})
})

module.exports = router;