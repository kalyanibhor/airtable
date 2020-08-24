import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { handleClick, pageNumbers } = this.props;
    console.log(this.props);
  
    return (
        <div>
        <nav aria-label="Page navigation example">
                    <ul class="pagination pagination-sm">
                   
                       {pageNumbers.map((el,index)=>{
                           return  <li class="page-item" key={el} onClick={()=>handleClick(index)}><a class="page-link" href="#!">{el}</a></li>
                       })}
                    
                    </ul>
                  </nav>
     
       
      </div>
    );
  }
}
