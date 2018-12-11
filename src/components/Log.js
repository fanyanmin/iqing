import React,{Component} from 'react'
import '../sass/log.scss'
import axios from 'axios'
import {connect} from 'react-redux';
import {tab} from '../actions/index.js';


class Log extends Component{
    constructor(){
        super()
        this.state={
            tabs : [
                { title: '登录', sub: '1' },
                { title: '注册', sub: '2' },
              ],
              displayLog:'block',
              displayReg:'none',
              underLine:0,
        }
        this.logClick=this.logClick.bind(this)
    }
    componentWillMount(){
    }
    componentDidMount(){
        this.props.change('none') //进来就改变状态
        console.log(this.props)
    }
    componentWillUnmount(){
        this.props.change('')   //改组件死掉后就把状态改回
    }
    handerClick(){
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
        axios.post('http://127.0.0.1:7001/api/use/login',{data})
        .then((res)=>{
            let {history}=this.props
            history.push('/home')
        }).catch((err)=>{
            console.log(err)
        })
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
    regORlog=(idx)=>{
        this.setState({
            underLine:idx
        })
        if(idx==0){
            this.toLog()
            
        }
        if(idx==1){
            this.toReg()
        }
    }
    toReg=()=>{
        this.setState({
            displayReg:'block',
            displayLog:'none',
        })
    }
    toLog=()=>{
        this.setState({
            displayReg:'none',
            displayLog:'block',
        })
    }
    render(){
       return <div className="Log">
       <ul>
           {this.state.tabs.map((tab,idx)=>(
               <li onClick={this.regORlog.bind(this,idx)} className={this.state.underLine===idx?'checked':''}>{tab.title}</li>
           ))}
           {/* <li onClick={this.toLog} >登录</li>
           <li onClick={this.toReg}>注册</li> */}
                <div className="Login" style={{'display':this.state.displayLog}}>
                <p>账号</p>
                <div className="mima"><span>+86</span><input type="text" className="us" id="uss"/></div>
                <p>密码</p>
                <input type="password" className="ps" id="pss"/>
                <div className="botton"><span className="quxiao">取消</span><span className="login" onClick={this.logClick}>登录</span></div>
              
                </div>
                <div className="Reg" style={{'display':this.state.displayReg}}>
                <p>账号</p>
                <div className="mima"><span>+86</span><input type="text" className="us" id="us"/></div>
                <p>密码</p>
                <input type="password" className="ps" id="ps"/>
                <div className="botton"><span className="quxiao">取消</span><span className="login" onClick={this.regClick}>注册</span></div>
                
                </div>
       </ul>
</div>
    }
}

let mapDispatchToProps = dispatch=>{
    //	console.log(dispatch)
        return {
            // 把change方法映射到props
            change(status){
                dispatch(tab(status));
            }
        }
    }
    Log = connect('',mapDispatchToProps)(Log);
    
export {Log}