import React from "react";
import styled from "styled-components";
import { state } from "../../store";
import { ordersActions, ordersSelector, ordersState } from "./store";
import Combo from "../Combo";
import { connect } from "react-redux";

export const OrderDetails = connect(
  state.select({
   
    customersOrders: ordersSelector((state) => state.customersOrders, []),
    orders: ordersSelector((state) => state.orders, []),
    orderDetails: ordersSelector((state) => state.orderDetails, []),
  }),
  state.actions(ordersActions, [
    "customersOrderList",
    "selectCustomer",
    "selectOrder",
  ])
)(
  class OrderDetails extends React.PureComponent {
    constructor(props) {
      super(props);

      this.selectedCustomer = this.selectedCustomer.bind();
      this.selectedOrder = this.selectedOrder.bind();
    }
    selectedCustomer = (ccode) => {
      console.log(ccode);
      this.props.selectCustomer(ccode);
    };
    selectedOrder = (ocode) => {
      console.log(ocode);

      this.props.selectOrder(ocode);
    };

    componentDidMount() {
      this.props.customersOrderList({});
    }

    render() {
      const { customersOrders, orders, orderDetails } = this.props;
  console.log(customersOrders);
      

      let options1 = customersOrders.map((c) => (
        <option key={c.ccode} value={c.ccode}>
          {c.name}
        </option>
      ));

      let options2 = orders.map((o) => (
        <option key={o.ocode} value={o.ocode}>
          {o.ocode}
        </option>
      ));
      const orderData = () => {
        return orderDetails.map((el, index) => {
          return (
            <tr key={index}>
              <td></td>
              <td class="orders-order">{el.odcode}</td>
              <td class="orders-order">{el.ocode}</td>
              <td class="orders-order">{el.pcode}</td>

              <td class="orders-date">{el.qty}</td>
              <td class="orders-date">{el.total}</td>
            </tr>
          );
        });
      };

      return (
        <div className="main-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                {" "}
                <div className="header">
                  <div class="header-body">
                    <div class="row align-items-end">
                      <div class="col">
                        <h6 class="header-pretitle">Overview</h6>

                        <h1 class="header-title">Orders</h1>
                      </div>
                      <div class="col-auto" style={{ display: "flex" }}>
                        <div style={{ margin: "5px" }}>
                          <Combo
                            options={options1}
                            onChangeHandler={(ccode) =>
                              this.selectedCustomer(ccode)
                            }
                          />
                        </div>
                        <div style={{ margin: "5px" }}>
                          <Combo
                            options={options2}
                            onChangeHandler={(ocode) =>
                              this.selectedOrder(ocode)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card"
                  data-list='{"valueNames": ["orders-order", "orders-product", "orders-date", "orders-total", "orders-status", "orders-method"]}'
                >
                  {/* <div class="card-header"> */}
                  {/* <!-- Search --> */}
                  {/* <form>
            <div class="input-group input-group-flush"> */}
                  {/* <SearchBar open onChangeHandler={searchProduct} /> */}
                  {/* </div>
          </form> */}

                  {/* <!-- Dropdown --> */}

                  {/* </div> */}
                  <div class="table-responsive">
                    <table class="table table-sm table-nowrap card-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                            >
                              Odcode
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                            >
                              ocode
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                            >
                             pcode
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                                                     >
                             Quantity
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                                                     >
                             total
                            </a>
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody class="list">{orderData()}</tbody>
                    </table>
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

export default OrderDetails;
