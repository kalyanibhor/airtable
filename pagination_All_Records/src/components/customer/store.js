import { state } from "../../store";
import { sorting } from "../../helper";
export const [customersActions, customersSelector, customersState] = state(
  "customersPage",
  {
    initial: {
      customers: [],
      filteredCustomer: { status: "loading", items: [], filtered: false },
      
      sortCustomerType: {
        ccode: { ascending: true },
        name: { ascending: true },
        updatedAt:{ascending:true}
      },
      offsetId:0,
      totalCount:0,
      opr:"Add",
      editIndex:-1,
      editData:{},
      modalToggleFlag:false,
      loading: false,
      apiError: { status: false, message: "" },
    },
    on: {
      load: (_, data) => {
        console.log(data);
        const newStoreObj = {
          ..._,
        };
        newStoreObj.loading = true;
        newStoreObj.offsetId = data.offsetId;
        newStoreObj.customers = data.customers;
       
        newStoreObj.opr ="Add";
        newStoreObj.filteredCustomer.filtered=true;
        newStoreObj.filteredCustomer.items = newStoreObj.customers.slice(0,100);   
          
              
        console.log(newStoreObj);
        return { ...newStoreObj };
      },
      changeFilterData:(_,page)=>{
      const newStoreObj = {
        ..._,
      };
      let offset=0;
      if((page-1)===0){
        offset=0;
      }
      else{
        offset=(page-1)*100;
    
      }
      newStoreObj.filteredCustomer.filtered=true;
      
       newStoreObj.filteredCustomer.items=[...newStoreObj.customers.slice(offset,offset+100)];
      // console.log(newStoreObj.filteredCustomer.items.slice(offset,offset+10));
                
      console.log(newStoreObj);
      return { ...newStoreObj };
     },
      onChangeEdit:(_,data,index)=>{
        console.log("data",data);
        const newStoreObj = {
          ..._
        };
        newStoreObj.loading = true;
        newStoreObj.editData=data;
        newStoreObj.opr="Update";
        newStoreObj.editIndex=index;
        
        newStoreObj.modalToggleFlag=!newStoreObj.modalToggleFlag;
        
        
        return {...newStoreObj};
      },

      onChangeCustomer:(_,data)=>{
        console.log("data",data);
        const newStoreObj = {
          ..._
        };
        newStoreObj.opr="Add";
       
        newStoreObj.modalToggleFlag=!newStoreObj.modalToggleFlag;
        
        
        return {...newStoreObj};
      },
      onChangeToggleFlag:(_)=>{
        const newStoreObj = {
          ..._
        };
        
        newStoreObj.modalToggleFlag=!newStoreObj.modalToggleFlag;
        
        
        return {...newStoreObj};
      },
    
      loadFilteredCustomer: (_, data) => {
        let newStoreObj = {
          ..._,
        };

        newStoreObj.filteredCustomer.loading = true;
        newStoreObj.filteredCustomer.items = data.filteredCustomer;
        console.log(newStoreObj);
        return {
          ...newStoreObj,
        };
      },
      customerFilteration: (_,data)=> {
        console.log("=>>",data);
        let newStoreObj={
          ..._
        }
     if(data.currentData.filterFlag==="true"){
         if(data.currentData.name!==""){
           
          newStoreObj.filteredCustomer.items=newStoreObj.filteredCustomer.items.filter((el)=>el.name.toUpperCase()===data.currentData.name.toUpperCase());
         }
        
     }
       else{
          newStoreObj.filteredCustomer.items=newStoreObj.customers;
       }
     console.log(newStoreObj);
       return{
          ...newStoreObj,
        }
      }
      ,
      sortCustomer: (_, data) => {
        console.log(data);

        let newStoreObj = {
          ..._,
        };
        
        newStoreObj.sortCustomerType[data.fieldName].ascending = !newStoreObj
          .sortCustomerType[data.fieldName].ascending;
        data.sortType = newStoreObj.sortCustomerType[data.fieldName].ascending;

        newStoreObj.filteredCustomer.items = [
          ...sorting(newStoreObj.filteredCustomer.items, data),
        ];
        newStoreObj.filteredCustomer.filtered=true;
        console.log(newStoreObj);
        return {
          ...newStoreObj,
        };
      },
      setApiError: (_, data) => {
        const newStoreObj = {
          ..._,
        };
        newStoreObj.apiError.status = data.status;
        newStoreObj.apiError.message = data.message;
        return newStoreObj;
      },
    },
    events: ["loadCustomerData", "searchCustomer","addRecord", "deleteRecord", "editRecord"],
  }
);
