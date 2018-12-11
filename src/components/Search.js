import React,{Component} from 'react';
import '../sass/search.scss';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import {Route,Redirect,Switch,} from 'react-router-dom';

import {Game} from '../components/Game';
import {Topic} from '../components/Topic';
import {User} from '../components/User';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUserCircle,
  faSearch,
  faBackward,
  faStepBackward
     } from '@fortawesome/free-solid-svg-icons'
library.add(
  faSearch,
  faUserCircle,
  faBackward,
  faStepBackward
)
class Search extends Component{
    constructor(){
        super()
        this.state={
            tabs:[
                {
                    // https://poi.iqing.com/kensaku/?type=book&fields=id,index_name,title,url,cover,humanize_count,author_name,intro,belief,combat,follow_count,bf_count&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=
                    title:'小说',
                    type:'book',
                    path:'/game'
                },
                {
                    // https://poi.iqing.com/kensaku/?type=game&fields=id,index_name,title,url,cover,scene_count,author_name,intro,belief,combat,follow_count,bf_count&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=
                    title:'清绘',
                    type:'game',
                    path:'/game'
                },
                {

                    // https://poi.iqing.com/kensaku/?type=activity&fields=index_name,id,title,cover,url,status,ended_time,started_time&offset=0&limit=9&p=1&order=0&channel=&rank=&end=&categories=&q=
                    title:'活动',
                    type:'activity',
                    path:'/topic',
                },
                {

                    // https://poi.iqing.com/kensaku/?type=topic&fields=index_name,id,title,cover,url&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=
                    title:'专题',
                    type:'topic',
                    path:'/topic',
                },
                {

                    // https://poi.iqing.com/kensaku/?type=user&fields=index_name,id,username,signature,avatar,fans_count,follow_count,sex&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=
                    title:'用户',
                    type:'user',
                    path:'/user',
                },
                {

                    // https://poi.iqing.com/kensaku/?type=favorite&fields=index_name,id,cover,work_count,user,title,intro,combat,belief&offset=0&limit=9&p=1&order=0&channel=&rank=&end=&categories=&q=
                    title:'书单',
                    type:'favorite',
                    path:'/favorite'
                },
               
            ],
            underLine:0
           
           
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(tab,idx){
        this.setState({
            underLine:idx
        })
        
        console.log(tab);
        let {history,match} = this.props;
        let url=match.path+tab.path
        // history.push(url);
        history.push({
            pathname:url,
            state:tab.type
        });
        console.log(this.props);
    }
    backClick(){
        console.log(this.props)
        this.props.history.go(-1)
       
    }
    searchClick(){
        // console.log(this.props.history.location)
        let {history}=this.props
        var s= document.getElementById('input')
        var aa=s.value
        console.log(aa)
        // console.log(history)
       console.log(this.props)
    //    let alis='111'
    //    this.props.history.push(
    //         alis
    //     )
        // console.log(this.props.history)
    }
    render(){
        let {match}=this.props
        return<div className="Search">
            <div className="top">
                <span className="back" onClick={this.backClick.bind(this)}><FontAwesomeIcon icon={faBackward} /></span>
                {/* <span className="icon-search"><FontAwesomeIcon icon={faSearch} /></span> */}
                <input type="text" className="input" id="input"/>
                <div className="search" onClick={this.searchClick.bind(this)}>搜索</div>
            </div>
            <ul className="nav">
                                {this.state.tabs.map((tab,idx) => (
                                                <li className="xx-li" key={tab.type}
                                                onClick={this.handlerClick.bind(this,tab,idx)}
                                                className={this.state.underLine===idx?'checked':''}
                                                >
                                                {tab.title}
                                                </li>
                                            ))}
                                </ul>
             {/* <Tabs tabs={this.state.tabs}
     
                initialPage={1}
                tabDirection='horizontal'
                onChange={(tab,index)=>{}}
                onTabClick={this.handlerClick}
                >
                </Tabs> */}
               
               
                <Switch>
                    <Route path={match.url+"/game"} component={Game}/>
                    <Route path={match.url+"/topic"} component={Topic}/>
                    <Route path={match.url+"/user"} component={User}/>
                    <Redirect from="/search/book/:id" to="/book/:id" exact/>
                    {/* <Route path={ match.url+"/zuixin"} component={zuixin}/> */}
                
                </Switch>


                    
        </div>
        
    }
}

export {Search}
