import React from "react"; //rce
// export class NewsItem extends Component {
  const NewsItem = (props) =>{  
  // render() {
    let {title , description , imageUrl , newsUrl , author , date , source} = props; //this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width:'18rem;'}}>
        <div style={{display : 'flex', justifyContent:'flex-end' , position : 'absolute' , right : '0'}}>
        <span className="badge rounded-pill bg-danger " style={{left : '83%' , zIndex: '1'}}>{source}</span>
        </div>
          <img src={!imageUrl?"	https://cdn.ndtv.com/common/images/ogndtv.png":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}...
            </p>
            <p class Name="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel = "noreferrer" href= {newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
