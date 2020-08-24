import React from 'react';


class InfiniteScroll extends React.Component {
    constructor(props) {
     super(props);
     console.log("constructor");
     this.state = {
        items: 10,
        loadingState: false
      };
    }
  
    componentDidMount() {
        console.log("componentDidmount")
      this.refs.iScroll.addEventListener("scroll", () => {
        if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 20){
          this.loadMoreItems();
        }
      });
    }
  
    displayItems() {
        console.log("displayItems")
      var items = [];
      for (var i = 0; i < this.state.items; i++) {
        items.push(<li key={i}>Item {i}</li>);
      }
      return items;
    }
  
    loadMoreItems() {
        console.log("loadMoreItems")
       if(this.state.loadingState){
           return;
       }
      this.setState({ loadingState: true });
      setTimeout(() => {
        this.setState({ items: this.state.items + 10, loadingState: false });
      }, 1000);
    }
  
    render() {
        console.log("render");
      return (
        <div ref="iScroll" style={{ height: "200px", overflow: "auto" }}>
          <ul>
            {this.displayItems()}
          </ul>
  
          {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
  
        </div>
      );
    }
  }
  
  export default InfiniteScroll;