import React from 'react';
import '../sass/Game.scss';
import axios from 'axios'
class Game extends React.Component{
    constructor(){
        super()
        this.state={
            
            type:['book'],
           booklist:[],
           
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
  
    componentWillMount(){
        console.log(this.props)
        // console.log(this.props.history.location.state)
        let {state}=this.props.history.location;
        let type='game'
        this.setState({
            type:type
        })
        console.log(this.state.type)
        axios.get(`/iqapi/kensaku/?type=${this.state.type}&fields=id,index_name,title,url,cover,humanize_count,author_name,intro,belief,combat,follow_count,bf_count&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=`

		).then(res=>{
			let data = res.data;
			this.setState({
                ...this.state.booklist,
                booklist:data.results
               
            });
            console.log(this.state.booklist)
        });
    }
   
    componentDidUpdate(){
        console.log(this.props)
    }
    handlerClick(books){
        let {history} = this.props;
        console.log(history);
        history.push({
            pathname:'book/'+books.id,
            state:books
        });
    }
    
    render(){
        return<div className="Game">
        <div className="container">
            <ul className="lastest-list">
                     {this.state.booklist.map(books => (
                                    <li className="lastest-li" key={books.id}
                                    onClick={this.handlerClick.bind(this,books)}
                                    >
                                    <img src={books.cover}/>
                                    <div className="lastest-right">
                                        <span>{books.title}</span>
                                        <p className="">作者：{books.author_name}</p>
                                        <p className="">信仰：{books.belief}</p>
                                        <p className="">战力：{books.combat}</p>
                                    </div>
                                    </li>
                                ))}
                     </ul>
                     </div>
        </div>


    }
}

export {Game}