import React from 'react';
import '../sass/user.scss';
import axios from 'axios'
class User extends React.Component{
    constructor(){
        super()
        this.state={
            type:'user',
            Userlist:[],
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
      
    componentWillMount(){
        
        axios.get(`/iqapi/kensaku/?type=${this.state.type}&fields=index_name,id,username,signature,avatar,fans_count,follow_count,sex&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=
        `
           
		).then(res=>{
            let data = res.data;
            console.log(data)
			this.setState({
                Userlist:data.results
               
            });
            console.log(this.state.Userlist)
        });
    }
    handlerClick(books){
        let {history} = this.props;
        console.log(history);
        // history.push({
        //     pathname:'book/'+books.id,
        //     state:books
        // });
    }
    render(){
        return<div className="User">
              
            <ul className="user-list">
                     {this.state.Userlist.map(books => (
                                    <li className="user-li" key={books.id}
                                    onClick={this.handlerClick.bind(this,books)}
                                    >
                                    <img src={books.avatar}/>
                                    <div className="user-right">
                                        
                                        <span className="">作者：{books.username}</span>
                                        <p className="">{books.signature}</p>
                                        <p>关注他的人：{books.fans_count}他的关注：{books.follow_count}</p>
                                        {/* <span className="">关注他的人：{books.fans_count}</span>
                                        <span className="">他的关注：{books.follow_count}</span> */}
                                    </div>
                                    </li>
                                ))}
                     </ul>
                    
        </div>


    }
}

export {User}