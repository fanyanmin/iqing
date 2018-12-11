const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo',{ useNewUrlParser: true });
 let  db = mongoose.connection;
 db.on("error", function (error) {
     console.log('connection error');
 });

 db.on("open", function () {
     console.log("数据库连接成功");
 })

 db.on('disconnected', function () {
     console.log('数据库连接断开');
 })
 /*
 let Schema=mongoose.Schema;
 let userSchema=new Schema({
 	us:{type:String,required:true},
 	ps:{type:String,required:true}
 })
let usermodel=mongoose.model('user',userSchema)
usermodel.insertMany({us:'123',ps:'456'})
.then((data)=>{
	console.log(data)
})
.catch((err)=>{
	console.log(err)
})
*/