import React from "react";



class SelectBox extends React.Component {
    constructor(props){
        super(props)
       this.lst=React.createRef();
        this.selectElement = this.selectElement.bind();
    }
    selectElement=()=>{
        
        this.props.onChangeHandler(this.lst.current.options[this.lst.current.selectedIndex].text);
    }
   

 
render() {
    const {options}=this.props;
    console.log(options);
    let option=options.map((el)=>(
        <option key={el.pcode} value={el.pcode}>
                {el.name}
            </option>
    ))
    return (
      <div>
        <select class="custom-select custom-select-sm" name="lst" ref={this.lst} onChange={this.selectElement}>
          <option>Select </option>
          {option}
        </select>
      </div>
    );
  }
}
export default SelectBox;