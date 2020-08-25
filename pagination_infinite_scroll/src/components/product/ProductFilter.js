import React, { Component } from "react";
import styled, { css } from "styled-components";
import "../../assets/css/theme.css";
import SelectBox from "./selectBox";
const prepareProduct = (filteredProduct) => {
  let theName = filteredProduct.map((name) => ({
    ...name,
    label: name.name,
    value: name.name,
  }));
  console.log(theName);
  theName = theName.reduce((acc, current) => {
    const x = acc.find((item) => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  
  return theName;
};
class Filter extends React.PureComponent {
  state = {
    name: "",
    filterFlag: "false",
  };

  resetAllFilter = () => {
    this.setState(
      {
        name: "",
        filterFlag: "false",
      },
      () => {
        this.props.productFilteration({
          currentData: this.state,
        });
      }
    );
  };

  setFilterstate = (event,key) => {
    console.log(event);
    let currentState = this.state;
    console.log(currentState);
    switch (key) {
      case "name":
        let currentName = event;
        currentState.name = currentName;

        currentState.filterFlag = "true";

        this.setState({ name: currentName, filterFlag: "true" });
        break;
    }

    this.props.productFilteration({
      currentData: currentState,
    });
  };

  render() {
    const { filteredProduct } = this.props;
    console.log(filteredProduct);
    
    return (
      <div class="col-auto">
        <div class="dropdown">
          <div class="card-header">
            <h4 class="card-header-title">Filters</h4>
            <button
              class="btn btn-sm btn-link text-reset"
              onClick={this.resetAllFilter}
            >
              Clear filters
            </button>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush mt-n4 mb-4">
              <div class="list-group-item">
                <div class="row">
                  <div class="col">
                    <small>Product Name</small>
                  </div>
                  <div class="col-6">
                    <SelectBox
                     
                      onChangeHandler={(event) => this.setFilterstate(event,"name")}
                      options={prepareProduct(filteredProduct)}                     
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-block btn-primary">Apply filter</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Filter;
