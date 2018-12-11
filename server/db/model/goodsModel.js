const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let goodsSchema=new Schema({
	id:{type:String,required:true},
	title:{type:String,required:true},
	img:{type:String,required:true},
	describe:{type:String,required:true},
	describeImg:{type:String,required:true},
	type:{type:String,required:true}
})

let goodsmodel=mongoose.model('Goods',goodsSchema);
module.exports=goodsmodel;
