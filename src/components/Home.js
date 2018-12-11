import React,{Component} from 'react';
import '../sass/home.scss';
import { Carousel } from 'antd-mobile';
import axios from 'axios';
class Home extends Component{
    constructor(){
        super();
        this.state={
            swiper:[],
            qiangtui:[],
            xinxiu:[],
            tuijian:[],
            remen:[],
            youhui:[],
            fenqu:[],
            lastest:[],
            num:0,
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
    componentWillMount(){
        axios.get('/iqapi/recommend/',{
			params:{
                type:2,
                limit:10,
                offset:0,
                channel:1,
			}
		}).then(res=>{
			let data = res.data;
			this.setState({
                swiper:data.results.slice(0,5)
               
            });
            // console.log(this.state.swiper)
        });
        
        axios.get('/iqapi/recommend/',{
			params:{
                type:3,
                limit:6,
                offset:0,
                channel:1
			}
		}).then(res=>{
			let data = res.data;
            
			this.setState({
                qiangtui:data.results.slice(0,6)
            });
           
        });
        
        axios.get('/iqapi/recommend/',{
			params:{
                type:8,
                limit:6,
                offset:0,
                channel:1
			}
		}).then(res=>{
			let data = res.data;
			this.setState({
                xinxiu:data.results.slice(0,6)
            });
        });
        
        axios.get('/iqapi/recommend/',{
			params:{
                type:10,
                limit:8,
                offset:0,
                channel:1
			// 	t:Date.now(),
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                tuijian:data.results.slice(0,8)
               
            });
            
        });

        axios.get('/iqapi/recommend/',{
			params:{
                type:7,
                limit:2,
                offset:0,
                channel:1
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                remen:data.results.slice(0,2)
               
            });
           
        });
        axios.get('/iqapi/recommend/',{
			params:{
                type:9,
                limit:4,
                offset:0,
                channel:1
			// 	t:Date.now(),
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                youhui:data.results.slice(0,5)
               
            });
        });
        axios.get('/iqapi/recommend/',{
			params:{
                type:11,
                limit:16,
                offset:0,
                channel:1
			// 	t:Date.now(),
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                fenqu:data.results.slice(0,16)
               
            });
        });
        let limit=10
        let offset=this.state.num
        console.log(offset)
        axios.get('/iqapi/book/last/',{
			params:{
                limit:limit,
                offset:offset,
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                lastest:data.results
            });
            // console.log(this.state.lastest)
        });
    }
    handlerClick(books){
        // console.log(books)
        //获取history
        let {history} = this.props;
        history.push({
            pathname:'book/'+books.book[0].id,
            state:books
        });
    }
    lastClick(books){
        // console.log(books)
        //获取history
        let {history} = this.props;
        history.push({
            pathname:'book/'+books.id,
            state:books
        });
    }
    handleScroll = (e) => {
        var clientHeight = document.documentElement.clientHeight;
        var scrollTop =document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        if(scrollTop + clientHeight >= scrollHeight){
        // 　　　　console.log("到底部了！");
        let num=this.state.num
            this.setState({
                num:num+10
            })
            console.log(this.state.num)
            let limit=10
                let offset=this.state.num
                console.log(offset)
                axios.get('/iqapi/book/last/',{
                    params:{
                        limit:limit,
                        offset:offset,
                    }
                }).then(res=>{
                    let data = res.data;
                    let results =data.results;
                    // console.log(data)
                    this.setState({
                       
                        // lastest:[...this.state.lastest,results] 
                        lastest:[...this.state.lastest.concat(results)]
                    });
                    // console.log(this.state.lastest)
                });
                console.log(this.state.lastest)
        }
    }
componentDidMount() {
    window.onscroll = ()=>{
        this.regScroll(this.handleScroll.bind(this));
    }
}
componentWillUnmount() {
    window.onscroll = '';
}


//添加事件监听
regScroll=(myHandler)=>{
    if (window.onscroll === null) {
        window.onscroll = myHandler
    } else if (typeof window.onscroll === 'function') {
        var oldHandler = window.onscroll;
        window.onscroll = function () {
            myHandler();
        }
    }
}
    render(){
        return <div className="home">
         <p className="recommend">推荐</p>
          <Carousel
                autoplay={true}
                infinite
                className="swiper"
                >
                {this.state.swiper.map(books => (
                    <a
                    key={books.id}
                    onClick={this.handlerClick.bind(this,books)}
                    >
                    <img
                        src={books.cover}
                        // style={{ width: '375px', height:'187.5px', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                        }}
                        alt=""
                    />
                    </a>
                ))}
                </Carousel>
                <div className="container">
                    <p className="tit">主编强推</p>
                    <ul className="qtlist">
                        {this.state.qiangtui.map(books => (
                            <li className="qt-li" key={books.id}
                            onClick={this.handlerClick.bind(this,books)}>
                            <img src={books.cover}/>
                            <span>{books.title}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="tit">签约新秀</p>
                    <ul className="xxlist">
                    {this.state.xinxiu.map(books => (
                            <li className="xx-li" key={books.id}
                            onClick={this.handlerClick.bind(this,books)}>
                            <img src={books.cover}/>
                            <div className="xx-right">
                                <span>{books.title}</span>
                                <p>{books.recommend_words}</p>
                            </div>
                            </li>
                        ))}
                     </ul>

                    <p className="tit">小编推荐</p>
                        <ul className="tjlist">
                            {this.state.tuijian.map(books => (
                                <li className="tj-li" key={books.id}
                                onClick={this.handlerClick.bind(this,books)}>
                                <img src={books.cover}/>
                                    <span>{books.title}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="tit">热门作品</p>
                        <ul className="xxlist">
                            {this.state.remen.map(books => (
                                    <li className="xx-li" key={books.id}
                                    onClick={this.handlerClick.bind(this,books)}>
                                    <img src={books.cover}/>
                                    <div className="xx-right">
                                        <span>{books.title}</span>
                                        <p>{books.recommend_words}</p>
                                    </div>
                                    </li>
                                ))}
                     </ul>
                      <p className="tit">限时优惠</p>
                        <ul className="yhlist">
                            {this.state.youhui.map(books => (
                                <li className="yh-li" key={books.id}
                                onClick={this.handlerClick.bind(this,books)}>
                                <img src={books.cover}/>
                                    <span>{books.title}</span>
                                </li>
                            ))}
                        </ul>
                         <p className="tit">分区推荐</p>
                        <ul className="fqlist">
                            {this.state.fenqu.map(books => (
                                    <li className="fq-li" 
                                    key={books.id} onClick={this.handlerClick.bind(this,books)}>
                                    <img src={books.cover}/>
                                    <div className="fq-right">
                                        <span>{books.title}</span>
                                        <p>{books.recommend_words}</p>
                                    </div>
                                    </li>
                                ))}
                     </ul>
                     <p className="tit">最近更新</p>
                     <ul className="lastest-list">
                     {this.state.lastest.map(books => (
                                    <li className="lastest-li" key={books.id}
                                    onClick={this.lastClick.bind(this,books)}
                                    >
                                    <img src={books.cover}/>
                                    <div className="lastest-right">
                                        <span>{books.title}</span>
                                        <p className="">作者：{books.author_name}</p>
                                        <p className="">信仰：{books.belief}</p>
                                    </div>
                                    </li>
                                ))}
                     </ul>
                </div>
          </div>
    }
}
// Home = withRouter(Home);
export {Home};