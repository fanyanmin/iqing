import React from 'react';
import '../sass/read.scss';
import axios from 'axios'
class Read extends React.Component{
    constructor(){
        super()
        this.state={
            tit:[],
            content:[],
        }
        // this.handlerClick = this.handlerClick.bind(this);
    }
  
    componentWillMount(){
        console.log(this.props.match.params.id)
        let {id}=this.props.match.params
        axios.get(`/iqapi/content/${id}/chapter/`)
        .then((res)=>{
            let data=res.data
            console.log(data)
            // var str=data.results[0].value;
            // var arr=str.split(" ");
            // console.log(arr)
            this.setState({
                tit:data.chapter_title,
                content:data.results[0].value
            })
            // console.log(this.state.content)
        })
    }
    render(){
        return<div className="Read">
            <h3>{this.state.tit}</h3>
            <div className="content">
                {this.state.content}
            </div>
        </div>


    }
}

export {Read}