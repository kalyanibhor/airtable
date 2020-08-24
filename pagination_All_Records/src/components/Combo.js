import React from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 130px%;
  height: 35px;
  background: white;
  color: black;
  padding-left: 5px;
  font-size: 14px;
  border: -1px;
  bordor-color: red;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Div = styled.div``;
class Combo extends React.Component {
    constructor(props){
        super(props)
       this.lst=React.createRef();
        this.selectElement = this.selectElement.bind();
    }
    selectElement=()=>{
        
        this.props.onChangeHandler(this.lst.current.options[this.lst.current.selectedIndex].value);
    }
  
render() {
    const {options}=this.props;
    
    return (
      <Div>
        <Select name="lst" ref={this.lst} onChange={this.selectElement}>
          <option>Select </option>
          {options}
        </Select>
      </Div>
    );
  }
}
export default Combo;