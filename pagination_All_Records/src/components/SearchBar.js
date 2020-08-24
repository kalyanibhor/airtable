import React from "react";
import "../assets/css/theme.css";
export class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.open) {
      this.state.open = true;
    }
    if (props.pushRight) {
      this.state.pushRight = true;
    }
  }
  state = {
    open: false,
  };

  toggleState = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    let toggleOpen = this.state.open;
    let pushRight = this.state.pushRight;
    let autoFocus = true;
    if (this.props.autoFocus === false) {
      autoFocus = this.props.autoFocus;
    }
    return (
      <div
        class="input-group input-group-flush"
        open={toggleOpen}
        pushRight={pushRight}
      >
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i
              class="fa fa-search"
              open={toggleOpen}
              onClick={this.toggleState}
            ></i>
          </span>
        </div>

        {toggleOpen && (
     
            <input class="form-control list-search" type="search" placeholder="Search"  onChange={this.props.onChangeHandler}>
          </input>
        )}
      </div>
    );
  }
}
