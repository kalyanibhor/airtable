import React from "react";
import styled from "styled-components";
import Filter from "./filter";



class SelectBox extends React.Component {
    constructor(props){
        super(props)
        this.state={defaultValue:-1}
       this.lst=React.createRef();
        this.selectElement = this.selectElement.bind();
    }
    componentDidMount(){
        this.props.onRef(this);
    }
    componentWillUnmount(){
        this.props.onRef(null);
    }
     selectElement=()=>{
        
        this.props.onChangeHandler(this.lst.current.options[this.lst.current.selectedIndex].text);
    }
  

   selectOnClick=()=>{
       console.log("select data");
       this.lst.current.selectedIndex=0;
   }
   
render() {
    const {options,defaultValue}=this.props;
    console.log(options);
    let option=options.map((el)=>(
        <option key={el.ccode} value={el.ccode}>
                {el.name}
            </option>
    ))
    
    return (
      <div>
         
        <select
         class="custom-select custom-select-sm"
         name="lst" 
         ref={this.lst} 
         onChange={this.selectElement} 
       
        >
          <option > Select </option>

          {option}
          
        </select>
      </div>
    );
  }
}
export default SelectBox;