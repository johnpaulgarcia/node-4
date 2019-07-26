const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
exports.register = (req,res,next) =>  {
	const {username,email,password} = req.body;
	const db = req.app.get('db');
	argon2.hash(password)
	      .then(hash => {
		  return db.users.save(
			{username,email,password:hash},
			{fields: ['id','username','email']});
		}).then(user=>{
		  const token = jwt.sign({userId: user.id},secret);
		  res.status(201).json({...user,token});
		})
		  .catch(err=>{
		  console.error(err);
		  res.status(500).end();
		});
}

exports.login = (req,res,next) => {
	let db = req.app.get('db');
	let {username,password} = req.body;
	db.users.findOne({username},{fields: ['id','username','email','password']})
		.then(user=>{
	        return argon2.verify(user.password,password).then(valid => {
		if(!user) throw new Error('Invalid Username!')
		const token = jwt.sign({userId: user.id},secret);
		delete user.password;
		res.status(200).json({...user,token});
	});
   }).catch(err=>{
		if(['Invalid Username!','Incorret Password!'].includes(err.message))
			{res.status(400).json({error: err.message})}
		else {
		   console.error(err);
		   res.status(500).end();
		}
	})
}

exports.getUser = (req,res,next) => {
	if(!req.headers.authorization) {return res.status(401).end()}
	try{
	   const token = req.headers.authorization.split(' ')[1];
	  jwt.verify(token,secret);
	  res.status(200).json({data:'You are authorized.'});
	}
	catch(err){
		console.log(err);
		res.status(401).end();
	}
}
