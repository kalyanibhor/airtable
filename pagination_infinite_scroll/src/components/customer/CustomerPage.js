import React, { useState, useEffect } from "react";
import "../../assets/css/theme.css";
import { state } from "../../store";
import { customersActions, customersSelector, customersState } from "./store";
import { connect } from "react-redux";
import { SearchBar } from "../SearchBar";
import "../../assets/fonts/feather/feather.css";
import FilterPage from "../filter";
import { Button } from "react-bootstrap";
import ModalPopup from "../Modal/Modal";

import Loader from "./loader/loader";
import Pagination from "../airtablePagination";
import InfiniteScrollPagination from "./infiniteScroll";

export const CustomerPage = connect(
  state.select({
    customers: customersSelector((state) => state.customers, []),
    filteredCustomer: customersSelector(
      (state) => state.filteredCustomer.items,
      []
    ),
    offsetId: customersSelector((state) => state.offsetId, []),
    editData: customersSelector((state) => state.editData, []),
    modalToggleFlag: customersSelector((state) => state.modalToggleFlag),
    opr: customersSelector((state) => state.opr, ""),
    loading: customersSelector((state) => state.loading, ""),
    editIndex: customersSelector((state) => state.editIndex, ""),
  }),
  state.actions(customersActions, [
    "loadCustomerData",
    "searchCustomer",
    "sortCustomer",
    "customerFilteration",
    "addRecord",
    "deleteRecord",
    "editRecord",
    "onChangeEdit",
    "onChangeCustomer",
    "onChangeToggleFlag",
    "changeFilterData",
  ])
)(
  class CustomerPage extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        filterOpen: false,
        ellipsesOpen: false,

        ellipseClassName:
          "dropdown-menu dropdown-menu-right dropdown-menu-card dropdown-primary",
      };
    }

    componentDidMount() {
      this.props.loadCustomerData();
    }
    addRecord = (temp) => {
      console.log("add button", temp);

      if (this.props.opr === "Add") {
        this.props.addRecord({ name: temp });
      }
      if (this.props.opr === "Update") {
        this.props.editRecord({ name: temp });
      }
    };
    editRecord = (index) => {
      let temp = this.props.filteredCustomer.items.slice(index, index + 1)[0];
      this.props.onChangeEdit(temp, index);
    };
    deleteRecord = (ccode) => {
      console.log(ccode);
      this.props.deleteRecord({ ccode });
    };
    onHide = () => {
      this.props.onChangeToggleFlag();
    };
    newCustomer = () => {
      this.props.onChangeCustomer();
    };
    showPopup = () => {
      return this.props.modalToggleFlag;
    };

    showEllipse = (index) => {
      console.log(this[`ellipse${index}`].innerHTML);
      if (this.state.ellipsesOpen) {
        this[`ellipse${index}`].className =
          "dropdown-menu dropdown-menu-right dropdown-menu-card dropdown-primary show";
      } else {
        this[`ellipse${index}`].className =
          "dropdown-menu dropdown-menu-right dropdown-menu-card dropdown-primary ";
      }
      this.setState({
        ellipsesOpen: !this.state.ellipsesOpen,
      });
    };
    handleClick = (page) => {
      console.log(page);

     this.props.changeFilterData(page);
    };
    render() {
      const {
       customers, 
        searchCustomer,
        filteredCustomer,
        loading,
        totalItems,
        offsetId,
        editData,
        modalToggleFlag,
      } = this.props;
      console.log(this.props);

      let page = {
        totalRecords: customers.length,
        pageLimit: 100,
        pageNeighbours: 1,
      };
     
      const customerData = () => {
        if (loading === true) {
          return filteredCustomer&&filteredCustomer.map((el, index) => {
            return (
              <tr key={index}>
                <td></td>
                <td className="orders-order">{el.fields.ccode}</td>
                <td className="orders-product">{el.fields.name}</td>

                <td className="text-right">
                  <div className="dropdown">
                    <span
                      href="#"
                      className="dropdown-ellipses dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={() => this.showEllipse(index)}
                    >
                      <i className="fe fe-more-vertical"></i>
                      <div
                        className="dropdown-menu dropdown-menu-right dropdown-menu-card dropdown-primary"
                        ref={(input) => {
                          this[`ellipse${index}`] = input;
                        }}
                      >
                        <span
                          className="dropdown-item"
                          onClick={() => this.editRecord(index)}
                        >
                          <i className="fa fa-pencil"></i>&nbsp;&nbsp;Edit
                        </span>
                        <span
                          className="dropdown-item"
                          onClick={() => this.deleteRecord(el.ccode)}
                        >
                          <i className="fa fa-trash"></i>&nbsp;&nbsp;Delete
                        </span>
                      </div>
                    </span>

                    <br />
                  </div>
                </td>
              </tr>
            );
          });
        } else {
          return <Loader />;
        }
      };

      return loading ? (
        <div className="main-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                {" "}
                <div className="header">
                  <div className="header-body">
                    <div className="row align-items-end">
                      <div className="col">
                        <h6 className="header-pretitle">Overview</h6>

                        <h1 className="header-title">customers</h1>
                      </div>
                      <div className="col-auto">
                        <span href="#" className="btn btn-primary lift">
                          <ModalPopup
                            opr={this.props.opr}
                            editData={editData}
                            show={modalToggleFlag}
                            onHide={() => this.onHide()}
                            addData={(temp) => this.addRecord(temp)}
                          />
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => this.newCustomer()}
                          >
                            New Customer
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card"
                  data-list='{"valueNames": ["orders-order", "orders-product", "orders-date", "orders-total", "orders-status", "orders-method"]}'
                >
                  <div className="card-header">
                    {/* <!-- Search --> */}
                    <form>
                      <div className="input-group input-group-flush">
                        <SearchBar open onChangeHandler={searchCustomer} />
                      </div>
                    </form>

                    {/* <!-- Dropdown --> */}
                    <FilterPage />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-sm table-nowrap card-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <span
                              href="#"
                              className="text-muted list-sort"
                              data-sort="orders-order"
                              onClick={(e) =>
                                this.props.sortCustomer({
                                  fieldName: "ccode",
                                  sortBy: "INTEGER",
                                })
                              }
                            >
                              CustomerCode
                            </span>
                          </th>
                          <th>
                            <span
                              href="#"
                              className="text-muted list-sort"
                              data-sort="orders-product"
                              onClick={(e) =>
                                this.props.sortCustomer({
                                  fieldName: "name",
                                  sortBy: "STRING",
                                })
                              }
                            >
                              CustomerName
                            </span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="list">
                        <InfiniteScrollPagination customerData={customerData()}/>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <Pagination
              handleClick={(page) => {
                this.handleClick(page);
              }}
              offsetId={offsetId}
              {...page}
            /> */}
          </div>
        </div>
      ) : (
        <div className="main-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                {" "}
                <div className="header">
                  <div className="header-body">
                    <div className="row align-items-end">
                      <div className="col">
                        <h6 className="header-pretitle">Overview</h6>

                        <h1 className="header-title">customers</h1>
                      </div>
                      <Loader />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
export default CustomerPage;
