import React from 'react';
import '../sass/topic.scss';
import axios from 'axios'
class Topic extends React.Component{
    constructor(){
        super()
        this.state={
            type:'topic',
            Topiclist:[],
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
      
    componentWillMount(){
        // let type=this.props.history.location.state
        // this.setState({
        //     type:type
        // })
        console.log(this.props.history.location.state)
        axios.get(`/iqapi/kensaku/?type=${this.state.type}&fields=index_name,id,title,cover,url&offset=0&limit=9&p=1&order=&channel=&rank=&end=&categories=&q=`
       
		).then(res=>{
			let data = res.data;
			this.setState({
                Topiclist:data.results
               
            });
            console.log(this.state.Topiclist)
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
        return<div className="Topic">
            <ul className="topic-list">
                     {this.state.Topiclist.map(books => (
                                    <li className="topic-li" key={books.id}
                                    onClick={this.handlerClick.bind(this,books)}
                                    >
                                    <img src={books.cover}/>
                                    <p>{books.title}</p>
                                    </li>
                                ))}
                     </ul>
        </div>


    }
}

export {Topic}