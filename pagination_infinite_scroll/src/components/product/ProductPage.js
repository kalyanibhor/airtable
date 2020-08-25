import React from "react";
import "../../assets/css/theme.css";
import { state } from "../../store";
import { productActions, productSelector, productState } from "./store";
import { connect } from "react-redux";
import { SearchBar } from "../SearchBar";
import "../../assets/fonts/feather/feather.css";
import ProductFilter from "./ProductFilter";
import { Button } from "react-bootstrap";
import ModalPopup from "./ModalPopup";
import Loader from "../customer/loader/loader";

export const ProductPage = connect(
  state.select({
    product: productSelector((state) => state.product, []),
    filteredProduct: productSelector(
      (state) => state.filteredProduct,
      []
    ),
     editData: productSelector((state) => state.editData, []),
    modalToggleFlag: productSelector((state) => state.modalToggleFlag),
    opr: productSelector((state) => state.opr, ""),
    editIndex: productSelector((state) => state.editIndex, ""),
  }),
  state.actions(productActions, [
    "loadProductData",
    "sortProduct",
    "searchProduct",
    "productFilteration",
    "addRecord",
    "deleteRecord",
    "editRecord",
    "onChangeEdit",
    "onChangeProduct",
    "onChangeToggleFlag",
  ])
)(
  class ProductPage extends React.PureComponent {
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
      this.props.loadProductData({});
    }
    addRecord = (name,price) => {
      console.log("add button", price);

      if (this.props.opr === "Add") {
        this.props.addRecord({ name: name,price:price });
      }
      if (this.props.opr === "Update") {
        this.props.editRecord({ name: name,price:price});
      }
    };
    editRecord = (index) => {
      let temp = this.props.filteredProduct.slice(index, index + 1)[0];      
      this.props.onChangeEdit(temp);
    };
    deleteRecord = (pcode) => {
      console.log(pcode);
      this.props.deleteRecord(pcode);
    };
    onHide=()=>{
     this.props.onChangeToggleFlag();
    }
    newProduct = () => {
      this.props.onChangeProduct();
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
    render() {
      
      const { filteredProduct, searchProduct , editData,
        modalToggleFlag,
        productFilteration,} = this.props;
      const productData = () => {
        if (filteredProduct.loading === true) {
        return filteredProduct.items.map((el,index) => {
          return (
            <tr>
              <td></td>
              <td class="orders-order">{el.fields.pcode}</td>
              <td class="orders-product">{el.fields.name}</td>
              <td class="orders-date">{el.fields.price}</td>
              <td class="text-right">
                <div class="dropdown">
                  <a
                    href="#"
                    class="dropdown-ellipses dropdown-toggle"
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
                      <a
                        className="dropdown-item"
                        onClick={() => this.editRecord(index)}
                      >
                        <i className="fa fa-pencil"></i>&nbsp;&nbsp;Edit
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => this.deleteRecord(el.pcode)}
                      >
                        <i className="fa fa-trash"></i>&nbsp;&nbsp;Delete
                      </a>
                    </div>
                  </a>

                  <br />
                </div>
                </td>
            </tr>
          );
        });
      }
      else {
        return <Loader />;
      }
    }
      let filterClassName =
      "dropdown-menu dropdown-menu-right dropdown-menu-card ";
    if (this.state.filterOpen) {
      filterClassName =
        "dropdown-menu dropdown-menu-right dropdown-menu-card show";
    }
   
      return filteredProduct.loading ? (
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

                        <h1 class="header-title">Products</h1>
                      </div>
                      <div class="col-auto">
                        <a href="#" class="btn btn-primary lift">
                         
                          <ModalPopup
                          opr={this.props.opr}
                          editData={ editData}
                            show={modalToggleFlag}
                            onHide={() => this.onHide()}
                            addData={(name,price) => this.addRecord(name,price)}
                          />
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => this.newProduct()}
                          >
                            New product
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card"
                  data-list='{"valueNames": ["orders-order", "orders-product", "orders-date", "orders-total", "orders-status", "orders-method"]}'
                >
                  <div class="card-header">
                    {/* <!-- Search --> */}
                    <form>
                      <div class="input-group input-group-flush">
                        <SearchBar open onChangeHandler={searchProduct} />
                      </div>
                    </form>

                    {/* <!-- Dropdown --> */}
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
                         {/* <ProductFilter
                            productFilteration={productFilteration}
                            filteredProduct={filteredProduct}
                          />{" "} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-sm table-nowrap card-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                              data-sort="orders-order"
                              onClick={(e) =>
                                this.props.sortProduct({
                                  fieldName: "pcode",
                                  sortBy: "INTEGER",
                                })
                              }
                            >
                              Code
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                              data-sort="orders-product"
                              onClick={(e) =>
                                this.props.sortProduct({
                                  fieldName: "name",
                                  sortBy: "STRING",
                                })
                              }
                            >
                              Name
                            </a>
                          </th>
                          <th>
                            <a
                              href="#"
                              class="text-muted list-sort"
                              data-sort="orders-product"
                              onClick={(e) =>
                                this.props.sortProduct({
                                  fieldName: "price",
                                  sortBy: "INTEGER",
                                })
                              }
                            >
                              Price
                            </a>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="list">{productData()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ): (
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

                        <h1 className="header-title">Products</h1>
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
export default ProductPage;
