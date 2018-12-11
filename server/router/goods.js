const express=require('express');
const Router1=express.Router();
const goodsModel=require('../db/model/goodsModel.js');
const util=require('../utils/utli.js');

/**
 * @api {post} /goods/goods_list/ 商品的信息
 * @apiName Goods
 * @apiGroup Goods
 *
 * @apiParam {String} keyword 每条商品的ID
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回查询信息
 */
Router1.post('/goods_list',(req,res)=>{
	let {id,title,type}=req.body;
	//判断是否有关键字
	if(id==undefined){
		if(title==undefined){
			if(type==undefined){
				res.send('查找失败')
			}else{
				goodsModel.find({'type':type})
				.then((data)=>{
					res.send(data)
				})
				.catch(()=>{
					res.send('查找失败')
				})
			}
		}else{
			goodsModel.find({"title": {$regex: title, $options:'i'}})
			.then((data)=>{
				res.send(data)
			})
			.catch(()=>{
				res.send('查找失败')
			})
		}
		
	}else{
		goodsModel.find({'id':id})
		.then((data)=>{
			res.send(data)
		})
		.catch(()=>{
			res.send('查找失败')
		})
	}
})

/**
 * @api {post} /news/paging_news/ 商品信息分页
 * @apiName News
 * @apiGroup News
 *
 * @apiParam {String} numbers 每页几条数据
 * @apiParam {String} page 第几页
 * 
 * @apiSuccess {String} err 错误信息
 * @apiSuccess {String} msg  返回信息
 */
//Router1.post('/paging_goods',(req,res)=>{
//	let {numbers,page}=req.body;
//	goodsModel.find().limit(Number(numbers)).skip(Number(page*numbers))
//	.then((data)=>{
//		return res.send(data)
//	})
//	.catch((data2)=>{
//		return res.send('查找失败')
//	})
//})
module.exports=Router1;