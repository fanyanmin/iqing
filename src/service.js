const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const user=require('./router/user.js');
const db=require('./dbconnect.js');
const path=require('path');
const upload=require('./router/upload.js');
const game=require('./router/game.js');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./')));
app.use(express.static(path.join(__dirname,'./public')));
app.use('/admin',express.static(path.join(__dirname,'./admin')));
app.use('/api/use',user);
app.use('/api/upload',upload);
app.use('/api/game',game);
app.listen(8888,(req,res)=>{
	console.log('服务器开启')
})
