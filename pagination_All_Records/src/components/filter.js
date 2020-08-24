import React, { Component } from "react";
import styled, { css } from "styled-components";
import "../assets/css/theme.css";
import { state } from "../store";
import { customersActions, customersSelector, customersState } from "../components/customer/store";
import { connect } from "react-redux";
import SelectBox from "./selectBox";

const prepareCustomer = (filteredCustomer) => {
  let theName = filteredCustomer.map((name) => ({
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
  constructor(props) {
    super(props)
    this.state = {
      name: "",
     
      filterFlag: "false",
    };

  }



  resetAllFilter = () => {
    this.setState(
      {
        name: "",
      
        filterFlag: "false",
      },
     ()=>{
      this.SelectBox.selectOnClick();
       this.props.resetFilterHandle(this.state);
      });
    
  };
  
  setFilterstate = (event, key) => {
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



  };

  applyFilter = () => {

    this.props.applyFilterHandle(this.state);
  }
  
  render() {
    const { filteredCustomer } = this.props;
    console.log(filteredCustomer);

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
                    <small>Customer Name</small>
                  </div>
                  <div class="col-6">
                    <SelectBox
                       onRef={ref => (this.SelectBox = ref)}              
                      onChangeHandler={(event) => this.setFilterstate(event, "name")}
                      options={prepareCustomer(filteredCustomer)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-block btn-primary" onClick={() => this.applyFilter()}>Apply filter</button>
          </div>
        </div>
      </div>
    );
  }
}



export const FilterPage = connect(
  state.select({
    customers: customersSelector((state) => state.customers, []),
    filteredCustomer: customersSelector(
      (state) => state.filteredCustomer.items,
      []
    ),

  }),
  state.actions(customersActions, [

    "customerFilteration",
  ])
)(
  class FilterPage extends React.Component {
    constructor(props) {
      super()
      this.state = { filterOpen: false }
    }
    applyFilter = (data) => {
      this.setState({
        filterOpen: !this.state.filterOpen
      })
      this.props.customerFilteration({
        currentData: data,
      });
    }
    resetFilter=(data)=>{
      this.setState({
        filterOpen: !this.state.filterOpen
      })
      this.props.customerFilteration({
        currentData: data,
      });
    }
   
    render() {
      let filterClassName =
        "dropdown-menu dropdown-menu-right dropdown-menu-card ";
      if (this.state.filterOpen) {
        filterClassName =
          "dropdown-menu dropdown-menu-right dropdown-menu-card show";
      }
      return (
        <div class="col-auto">
          <div class="dropdown">
            <button
              class="btn btn-sm btn-white"
              type="button "
              onClick={() =>
                this.setState({
                  filterOpen: !this.state.filterOpen,
                })
              }
            >
              <i class="fe fe-sliders mr-1"></i> Filter{" "}
              <span class="badge badge-primary ml-1 d-none">0</span>
            </button>
            <div class={filterClassName}>
              <Filter
                
              // <button onClick={this.onClick}>Child.method()</button>
                applyFilterHandle={(data) => this.applyFilter(data)}
                resetFilterHandle={(data)=>this.resetFilter(data)}
                filteredCustomer={this.props.filteredCustomer}
              />{" "}
            
            </div>
          </div>
        </div>
      )
    }
  })
  export default FilterPage;