import React from "react";
import CustomerPage  from "../components/customer/CustomerPage";
import Product from "./product/ProductPage";

/*
* This object literal will help to encapsulate all the forms that could we have.
*/
const FormsManage = {
  customers : {
    render(props){
      return <CustomerPage {...props} />
    }
  },
  products:{
    render(props){
      return <Product {...props} />
    }
  }
 
};
/*
* Main form component
*/
const Form = (props) => {
    console.log(props);
  // here we are getting the form by type
  const userForm = FormsManage[props.type];
  return userForm.render(props);
};
export default Form;