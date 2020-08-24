import React from "react";
import { state } from "../../store";
import { shoppingActions, shoppingSelector} from "./store";
import { connect } from "react-redux";
import Combo from "../Combo";

export const ShoppingPage = connect(
  state.select({
    customers: shoppingSelector((state) => state.customers.item, []),
    customerCode: shoppingSelector((state) => state.customerCode, ""),
    product: shoppingSelector((state) => state.product.item, []),
  }),
  state.actions(shoppingActions, [
    "loadCustomerProductData",
    "customerOrderDetails",
    "setCustomerCode",
  ])
)(
  class ShoppingPage extends React.PureComponent {
    constructor(props) {
      super(props);

      this.totalAmount = React.createRef();
      this.selectedCustomer = this.selectedCustomer.bind();
      this.quantityUpdated = this.quantityUpdated.bind();
      this.onPlaceOrder = this.onPlaceOrder.bind();
    }
    componentDidMount() {
      console.log("customer product called");
      this.props.loadCustomerProductData();
    }
    selectedCustomer = (ccode) => {
      console.log(ccode);
      this.props.product.forEach((el, index) => {
        this[`qty${index}`].value = 0;
        this[`total${index}`].value = 0;
      });
      this.totalAmount.current.innerHTML = 0;
      this.props.setCustomerCode(ccode);
    };

    quantityUpdated = (index, price) => (event) => {
      this[`total${index}`].value = this[`qty${index}`].value
        ? price * parseInt(this[`qty${index}`].value)
        : 0;
      const totalAmt = this.props.product.reduce((total, el, index) => {
        return total + parseInt(this[`total${index}`].value);
      }, 0);
      this.totalAmount.current.innerHTML = totalAmt;
    };

    onPlaceOrder = () => {
      let temp = "";
      let orderDetailsList = [];
      if (this.props.customerCode === "") {
        alert("please select customer!!");
      } else {
        this.props.product.forEach((el, index) => {
          if (this[`qty${index}`].value > 0) {
            temp = {
              pcode: el.pcode,
              qty: this[`qty${index}`].value,
              total: this[`total${index}`].value,
            };
            orderDetailsList.push(temp);
          }
          this[`qty${index}`].value = "";
          this[`total${index}`].value = "";
        });
        this.totalAmount.current.innerHTML = "";
        this.props.customerOrderDetails({
          orderList: {ccode:this.props.customerCode},
          orderdetailsList: orderDetailsList,
        });
      }
    };

    
    render() {
      console.log("render");

      const { product, customers } = this.props;
      console.log(customers);
      let options =
        customers &&
        customers.map((c) => (
          <option key={c.fields.ccode} value={c.fields.ccode}>
            {c.fields.name}
          </option>
        ));
      console.log(options);
      const productData = () => {
        return product.map((el, index) => {
          return (
            <tr key={el.fields.pcode}>
              <td></td>
              <td class="orders-order">{el.fields.pcode}</td>
              <td class="orders-product">{el.fields.name}</td>
              <td class="orders-date">{el.fields.price}</td>
              <input class="orders-date"
                onChange={this.quantityUpdated(index, el.fields.price)}
                ref={(input) => {
                  this[`qty${index}`] = input;
                }}
                style={{ width: "50%",marginTop:"15px" }}
                type="number"
                placeholder={el.fields.qty}
              />
              <td></td>
              <input class="orders-date"
                type="text"
                disabled
                ref={(input) => {
                  this[`total${index}`] = input;
                }}
                style={{ width: "50%",marginTop:"15px" }}
                placeholder={el.fields.total}
              />
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

                        <h1 class="header-title">Shopping</h1>
                      </div>
                      <div class="col-auto">
                        <div >                               
                          <Combo
                            options={options}
                            onChangeHandler={(ccode) =>
                              this.selectedCustomer(ccode)
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
                              Code
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                             
                            >
                              Name
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                             
                            >
                              Price
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
                          <th></th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                             
                            >
                              Total
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="list">
                        {productData()}
                        
                      </tbody>
                     
                    </table>
                    <div>
                    <h3 style={{marginLeft:"695px",color:"blue"}}>
                          Total Amount:&nbsp;&nbsp;
                          <span ref={this.totalAmount}></span>
                        </h3>
                        </div>
                    <button type="button" onClick={this.onPlaceOrder}>
              Place Order
             </button>
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
export default ShoppingPage;
