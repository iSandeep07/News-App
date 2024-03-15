import React, { useEffect, useState } from 'react' //rce
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


// export class News extends Component {
  const News = (props) =>{
       
    const [articles , setArticles] = useState([])
    const [loading , setLoading] = useState(true)
    const [page , setPage] = useState(1)
    const [totalResults , setTotalResults] = useState(0)

    // static defaultProps = {
    //     country : 'in',
    //     pageSize : 6,
    //     category:'general'
    // }

    // static propTypes = {
    //     country : PropTypes.string,
    //     pageSize : PropTypes.number, 
    //     category: PropTypes.string,
    // }

    const capitalizedFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () =>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)

      props.setProgress(100);
    }

    useEffect(()=>{
    document .title = `${this.capitalizedFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
      //edlint-disble-next-line
    } , [])

  //  const  handlePrevClick = async () =>{
  //     // this.setState({page : this.state.page -1 });
  //     setPage(page-1);
  //     updateNews();
  //   }
  // const  handleNextClick = async () =>{
  //     // this.setState({page : this.state.page + 1});
  //     setPage(page+1);
  //     updateNews();
  //   }
    // constructor(props){
    //     super(props);
    //     console.log("Hello I am a constructor from News component");
    //     this.state = {
    //         //   articles : this.articles,
    //           articles : [],
    //           loading : true,
    //           page : 1,
    //           totalResults : 0

    //     }
    //    document .title = `${this.capitalizedFirstLetter(props.category)} - NewsMonkey`;
    // }

//    const componentDidMount = async() =>{
//     props.setProgress(10);
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
//     (this.setState({loading : true}));
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({articles : parsedData.articles , totalResults : parsedData.totalResults,loading : false  })
//     props.setProgress(100);
// }

//  handlePreviousClick = async () =>{
//      console.log("Previous");

//      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//      (this.setState({loading : true}));
//      let data = await fetch(url);
//      let parsedData = await data.json();
//      console.log(parsedData);
//      this.setState({ page : this.state.page + 1,articles : parsedData.articles})
//      this.setState({
//        page : this.state.page - 1,
//        loading : false
//      })
// }

//  handleNextClick = async ()=>{
//       console.log("Next");

//       if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){ 
//       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//       (this.setState({loading : true}));
//       let data = await fetch(url);
//       let parsedData = await data.json();
//     //   console.log(parsedData);
//       this.setState({ page : this.state.page + 1,articles : parsedData.articles ,loading : false})
//       }     
// };

const fetchMoreData = async ()=>{
  setPage(page +1);
  // this.setState({page : this.state.page +1})
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}`;
//  this.setState({loading : true});
 let data = await fetch(url);
 let parsedData = await data.json();
 setArticles(articles.concat(parsedData.articles));
 setTotalResults(parsedData.totalResults);
//  this.setState({
//   articles : this.state.articles.concat(parsedData.articles),
//   totalResults: parsedData.totalResults,
//   // loading : false,
//  })
};

  // render() {
    return (
      <div className='container my-3'>
         <h1 className='text-center' style={{margin:'40px 0px ' , marginTop : '90px'}}>NewsMonkey - Top Headlines from {capitalizedFirstLetter(props.category)}</h1>
         {loading && <Spinner/>}
         <InfiniteScroll
             dataLength={articles.length}
             next={fetchMoreData}
             hasMore={articles.length !== totalResults}
             loader ={<Spinner/>}>
         
        <div className='row'>
        {!loading && articles.map((element) =>{
            return <div className='col md-4' key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45): ""} description = {element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
         
        })}  
        </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
            <button  disabled={this.state.page <=1}  type='button'  className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button  disabled ={(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))}  type='button'  className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </div>
    )
}

 News.defaultProps = {
        country : 'in',
        pageSize : 6,
        category:'general'
    }

    News.propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number, 
        category: PropTypes.string,
    }

export default News
