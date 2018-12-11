const express=require('express');
const router=express.Router();
const userModel=require('../model/userModel.js');
const mail=require('../mail.js');
const util=require('../util/utli.js');
let obj={}

router.post('/login',(req,res)=>{
	let{us,ps}=req.body;
	userModel.find({us,ps})
//	console.log({us,ps})
	.then((data)=>{
		console.log({us,ps})
		if(data.length>=1){
			
//			return res.send('login OK')
res.send(util.sendData(0,'login OK'))
		}
//		res.send('login 失败')
res.send(util.sendData(-1,'login fail'))
	})
//	res.send(`${us}${ps}`);
})


router.post('/reg',(req,res)=>{
	let{us,ps,code}=req.body;
	if(obj[us]!==code){
		return res.send(util.sendData(-1,'验证码错误',null))
	}
	
	userModel.insertMany({us,ps})
	.then((data)=>{
//		res.send('regok');
res.send(util.sendData(0,'注册ok 请登录',null))
	})
	.catch((err)=>{
		console.log(err)
//		res.send('reg失败');
res.send(util.sendData(-1,'注册失败',null))
	})
//	res.send('regok');
})