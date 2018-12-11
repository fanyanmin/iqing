import React,{Component} from 'react'
import '../sass/log.scss'
import axios from 'axios'
// import store from '../../store';
// import {tab} from '../../actions'
class Log extends Component{
    constructor(){
        super()
        this.state={
            tabs : [
                { title: '登录', sub: '1' },
              ]
        }
        this.handerClick=this.handerClick.bind(this)
    }
    componentWillMount(){
        // store.dispatch(tab(false))
    }
    handerClick(){
        let {history}=this.props
        let url='/reg'
        history.push(url)
    }
    logClick(){
        // console.log(123)
        var us=document.getElementById('uss').value;
        console.log(us)
        var ps=document.getElementById('pss').value;
        console.log(ps)
        var data={
            us:us,
            ps:ps
        }
        axios.post('http://127.0.0.1:7000/api/use/login',{data})
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
           <div className="mima"><span>+86</span><input type="text" className="us" id="uss"/></div>
           <p>密码</p>
           <input type="password" className="ps" id="pss"/>
           <div className="botton"><span className="quxiao">取消</span><span className="login" onClick={this.logClick.bind(this)}>登录</span></div>
           <p className="reg" onClick={this.handerClick.bind(this)}>去注册</p>
       </ul>
    </div>
    }
}
export {Log}