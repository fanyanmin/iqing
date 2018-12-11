import React,{Component} from 'react'
import '../sass/log.scss'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import axios from 'axios'
// import 
class Reg extends Component{
    constructor(){
        super()
        this.state={
            tabs : [
                { title: '注册', sub: '1' },
              ]
        }
        this.handerClick=this.handerClick.bind(this)
    }
    handerClick(){
        // console.log(this.props)
        let {history}=this.props
        let url='/log'
        history.push(url)
    }
    regClick(){
        var us=document.getElementById('us').value;
        console.log(us)
        var ps=document.getElementById('ps').value;
        console.log(ps)
        var data={
            us:us,
            ps:ps
        }
        axios.post('http://127.0.0.1:7001/api/use/reg',{data})
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
       return <div className="Log">
       <ul>
           {this.state.tabs.map(tab=>(
               <li>{tab.title}</li>
           ))}
           <p>账号</p>
           <div className="mima"><span>+86</span><input type="text" className="us" id="us"/></div>
           <p>密码</p>
           <input type="password" className="ps" id="ps"/>
           <div className="botton"><span className="quxiao">取消</span><span className="login" onClick={this.regClick.bind(this)}>注册</span></div>
           <p className="reg" onClick={this.handerClick.bind(this)}>去登录</p>
       </ul>
    </div>
    }
}
export {Reg}