import React from 'react';
// import Header from '../../node_modules/rmc-calendar/lib/calendar/Header';
import '../sass/Book.scss';
import axios from 'axios'
import {Route,Redirect,Switch,} from 'react-router-dom';
import {Read} from './Read'
import {Game} from '../components/Game';

class Book extends React.Component{
    constructor(){
        super()
        this.state={
            books:[],
            categories:[],
            author:[],
            read:[],
            readid:[],
        }
        this.goRead = this.goRead.bind(this);
    }
    componentWillMount(){
        let bid=this.props.match.params.id
        axios.get('/iqapi/book/'+bid+'/api/')
        .then(res=>{
            let data = res.data;
            this.setState({
                books:data,
                categories:data.categories,
                author:data.author,
            });
        });
        axios.get('/iqapi/book/'+bid+'/chapter/?limit=1&offset=0')
        .then(res=>{
            let data = res.data;
            this.setState({
                read:data.results,
                readid:data.results[0].chapter[0].id
            });
            console.log(this.state.read)
            console.log(this.state.readid)

        });
    }
    goRead(id){
        console.log(id)
        let {history} = this.props;
        history.push({
            pathname:'read/'+id,
            state:id
        });
       
    }
    render(){

        console.log(this.state.readid)
        let {books}=this.state
        console.log(books)
        let {categories}=this.state
        let {author}=this.state
       let {readid}=this.state
       
        return<div className="Book">
            <div className="read"  onClick={this.goRead.bind(this,readid)}>
                <div className="tu"></div>
                <span>开始阅读</span>
            </div>
            <div className="top">
                    <div className="bg"><img src={books.cover} alt=""/></div>
                  <img className="img" src={books.cover} alt=""/> 
                    <div className="top-right">
                        <p className="top-tit">{books.title}</p>
                        {this.state.categories.map(books => (
                            <span key={books.id} >{books.name}</span>
                        ))}
                        <p>信仰：{books.belief} 战力：{books.humanize_count}</p>
                        <p>更新时间：{books.created_time}</p>
                    </div>  
            </div>
            <div className="introduce">
                <section className="compadding">
                <p>{books.coin}轻石/{books.gold}重石/{books.humanize_count}人气/{books.follow_count}收藏</p>
                <p>简介：{books.intro}</p>
                </section>
            </div>
            <div className="info"><li className="compadding">
                <span>投石</span><span>订阅</span><span>收藏</span>
                </li>
            </div>
            <section className="author">
                <div className="compadding">
                {this.state.author.map(books => (
                    <div key={books.id}>
                        <figure ><img src={books.avatar} alt=""/></figure>
                        <div className="name">
                            <p>{books.username}</p>
                            <p>{books.signature}</p>
                        </div>
                        <div className="focus">关注</div>
                     </div>
                   
                ))}
                </div>
            </section>
            <section className="mulu">
                <div className="compadding">
                    <span className="mulu-l">目录</span>
                    <span className="tiao">{books.chapter_count}></span>
                </div>
                    
            </section>











                <Switch>
                    {/* <Route path='/Read' component={Read}/>
                   
                    <Redirect from="/search/book/:id" to="/book/:id" exact/>  */}
                   
                
                </Switch>
        </div>
    }
}


// Goods = withRouter(Goods);
export {Book}