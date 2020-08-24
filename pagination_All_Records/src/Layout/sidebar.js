import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/theme.css";
import Logo from "../assets/img/logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CustomerPage from "../components/customer/CustomerPage";
import Product from "../components/product/ProductPage";
import MainPage from "./MainPage";
import ShoppingPage from "../components/shopping/ShoppingPage";
import OrderDetails from "../components/order/OrderDetails";

class Sidebar extends Component {
openModal=()=>{
  
  this.props.openWindow();
}
  render() {
     
    return (
      <Router>
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
          <div className="container-fluid">
         
            <Link to ="/" className="navbar-brand">
              <img src={Logo} className="navbar-brand-img mx-auto" alt="..."/>
              </Link>
          
            <div className="collapse navbar-collapse" id="sidebarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <span className="nav-link" href="#">
                    <i className="fa fa-user" aria-hidden="true"></i>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/customers" >Customers</Link>
                  </span>
                  <span className="nav-link" href="#">
                    <i className="fa fa-product-hunt" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <Link to="/products" >Products</Link>
                  </span>
                  <span className="nav-link" href="#">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <Link to="/shopping">Shopping</Link>
                  </span>
                  <span className="nav-link" href="#">
                    <i className="fa fa-book" aria-hidden="true"></i>{" "}
                    &nbsp;&nbsp;
                    <Link to="/order">Orders</Link>
                  </span>
                </li>
              </ul>
              </div>
              </div>
            </nav>
            <Switch>
            <Route exact path='/' component={MainPage}/>      
           
              <Route path='/customers'>
                <CustomerPage openWindow={()=>this.openModal()}/>
              </Route>
              <Route path='/products'>
                <Product/>
              </Route>
              <Route path='/shopping'>
                <ShoppingPage/>
              </Route>
              <Route path='/order'>
                <OrderDetails/>
              </Route>
              
            </Switch>
          
        
      </Router>
    );
  }
}
export default Sidebar;
