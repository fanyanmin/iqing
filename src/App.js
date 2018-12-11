import React, { Component } from 'react';
import './sass/app.scss';
import logoImg from './img/logo.jpg';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {Home} from './components/Home';
import {Book} from './components/Book';
import {Search} from './components/Search';
import {NotFound} from './components/Page';
import {Read} from './components/Read';
import {NavLink} from 'react-router-dom'
import {Log} from './components/Log'
import {Reg} from './components/Reg'

import store from './store.js';
import {tab} from './actions'
import {connect} from 'react-redux';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUserCircle,
  faSearch
     } from '@fortawesome/free-solid-svg-icons'
library.add(
  faSearch,
  faUserCircle
)
class App extends Component {
  constructor(){
    super()
    this.state={
      displayTop:'',
    }
    this.handlerClick=this.handlerClick.bind(this)
  }
  handlerClick(){
    let {history} = this.props;
}
  render() {
    return (
      <div className="App">
      <Switch>
                    <Route path="/home" component={Home} />
                    <Redirect from="/book/read/:id" to="/read/:id" exact/>
                    <Route path="/book/:id" component={Book} />
                    <Route path="/log" component={Log}/>
                    <Route path="/reg" component={Reg}/>
                    <Redirect path="/search" to="/search/game" exact/>
                    <Route path="/search" component={Search} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/read/:id" component={Read} />
                    <Redirect from="/" to="/home" exact/>
                    <Redirect to="/404"/>
                </Switch>
      <header style={{'display':this.props.displayTop}}>
           <NavLink to="/home" className="logo"><span  onClick={this.handlerClick.bind(this,'/home')}><img src={logoImg} alt=""/></span>
          </NavLink>
          <NavLink to="/search" className="search"> <span className="search"><FontAwesomeIcon icon={faSearch} /></span>
          </NavLink> 
          <NavLink to="/log" className="header-right"> <span className="header-right"><FontAwesomeIcon icon={faUserCircle}/></span>
          </NavLink> 
           {/* <span className="header-right"><FontAwesomeIcon icon={faUserCircle}/></span> */}
      </header>
       
      </div>
    );
  }
}


let mapStateToProps = state=>{
  // 此处必须返回一个对象
//  console.log(state);

  return {
      //把state.commonReducer.tabbarStatus映射到props
      displayTop:state.commonReducer.displayTop,
      // login:state.commonReducer.login,
  }
}

App = connect(mapStateToProps)(App);

//利用高阶组件传递路由参数
App=withRouter(App)

export default App;
