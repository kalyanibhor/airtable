import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

class InfiniteScrollPagination extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

  render() {
const {customerData}=this.props;
    return (
      <div>
        
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div key={index}>
              {customerData}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteScrollPagination;
