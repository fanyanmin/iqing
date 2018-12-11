import React,{Component} from 'react';
import '../sass/home.scss';
import { Carousel,Grid,List } from 'antd-mobile';
import axios from 'axios';

const Item = List.Item;
const Brief = Item.Brief;
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
			// 	t:Date.now(),
			}
		}).then(res=>{
			let data = res.data;
			this.setState({
                swiper:data.results.slice(0,5)
               
            });
            console.log(this.state.swiper)
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
            console.log(this.state.qiangtui)
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
            console.log(this.state.xinxiu)
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
            console.log(this.state.tuijian)
        });

        axios.get('/iqapi/recommend/',{
			params:{
                type:7,
                limit:2,
                offset:0,
                channel:1
			// 	t:Date.now(),
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                remen:data.results.slice(0,2)
               
            });
            console.log(this.state.remen)
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
            console.log(this.state.youhui)
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
            console.log(this.state.fenqu)
        });
        axios.get('/iqapi/book/last/',{
			params:{
               
                limit:10,
                offset:10,
			}
		}).then(res=>{
			let data = res.data;
           
			this.setState({
                lastest:data.results.slice(0,10)
               
            });
            console.log(this.state.lastest)
        });
    }

    handlerClick(books){
        console.log(books)
        //获取history
        let {history} = this.props;
        console.log(history);
        history.push({
            pathname:'book/'+books.id,
            state:books
        });
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
                    href="books.href"
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
                            <li className="qt-li" key={books.id}>
                            <img src={books.cover}/>
                            <span>{books.title}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="tit">签约新秀</p>
                    <ul className="xxlist">
                    {this.state.xinxiu.map(books => (
                            <li className="xx-li" key={books.id}>
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
                                <li className="tj-li" key={books.id}>
                                <img src={books.cover}/>
                                    <span>{books.title}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="tit">热门作品</p>
                        <ul className="xxlist">
                            {this.state.remen.map(books => (
                                    <li className="xx-li" key={books.id}>
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
                                <li className="yh-li" key={books.id}>
                                <img src={books.cover}/>
                                    <span>{books.title}</span>
                                </li>
                            ))}
                        </ul>

                         <p className="tit">分区推荐</p>
                        <ul className="fqlist">
                            {this.state.fenqu.map(books => (
                                    <li className="fq-li" key={books.id}>
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
                     {this.state.fenqu.map(books => (
                                    <li className="lastest-li" key={books.id}>
                                    <img src={books.cover}/>
                                    <div className="lastest-right">
                                        <span>{books.title}</span>
                                        <p className="">作者：{books.author_name}</p>
                                        <p className="">信仰：<span>{books.belief}</span></p>
                                    </div>
                                    </li>
                                ))}
                     </ul>



                {/* <List className="lastest-list">
        {
          this.state.lastest.map((books) => {
            return (
                <div>
              <Item key={books.id}
                align="top"
                thumb={books.cover}
                multipleLine
                platform="android"
                onClick={this.handlerClick.bind(this,books)}
                 >
                <p className="">作者：{books.author_name}</p>
                <p className="">信仰：<span>{books.belief}</span></p>
              </Item>
              </div>
            )
          })
        }
      </List> */}
                </div>
          </div>
    }
}
// Home = withRouter(Home);
export {Home};