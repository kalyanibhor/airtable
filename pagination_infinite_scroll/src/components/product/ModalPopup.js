import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";




class ModalPopup extends React.Component {
    constructor(props){
        super(props)
        this.txtName=React.createRef();
        this.txtPrice=React.createRef();
    }
    componentDidUpdate(){
        console.log("didmount");
        console.log(this.props.editData);
        if(this.props.opr==="Update")
        {
            this.txtName.current.value=this.props.editData.name;
            this.txtPrice.current.value=this.props.editData.price.toString();
        }
    }
   addData=()=>{
        console.log(this.txtName.current.value)
        this.props.onHide();
        this.props.addData(this.txtName.current.value,this.txtPrice.current.value);
    
         
     }   

render(){
    console.log("render");
  return (
      <>
      
    <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {this.props.opr} data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <label > Name</label>
        <InputGroup className="mb-3">
      
          <FormControl
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            ref={this.txtName}
          />
          </InputGroup>
          <label > Price</label>
          <InputGroup className="mb-3">
          <FormControl
            placeholder="Price"
            aria-label="Price"
            aria-describedby="basic-addon2"
            ref={this.txtPrice}
          />
        </InputGroup>
        <div className="float-none">
          <Button variant="primary" size="sm"  onClick={this.addData}>
            {this.props.opr}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
}
export default ModalPopup;
