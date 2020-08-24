import { state } from "../../store";
import { sorting } from "../../helper";
export const [productActions, productSelector, productState] = state(
  "productPage",
  {
    initial: {
      product: [],
      filteredProduct: { status: "loading", items: [], filtered: false },
      sortProductType: {
        pcode: { ascending: true },
        name: { ascending: true },
        price: { ascending: true },
      },
      editData:{},
      modalToggleFlag:false,
      loading: false,
      apiError: { status: false, message: "" },
    },
    on: {
      load: (_, data) => {
        const newStoreObj = {
          ..._,
        };
        newStoreObj.loading = true;
        newStoreObj.product = data;
        newStoreObj.filteredProduct.loading = true;
        newStoreObj.filteredProduct.items = data;
        console.log(newStoreObj);
        return { ...newStoreObj };
      },
      onChangeEdit:(_,data)=>{
        console.log("data",data);
        const newStoreObj = {
          ..._
        };
        newStoreObj.loading = true;
        newStoreObj.editData=data;
        newStoreObj.opr="Update";
        newStoreObj.modalToggleFlag=!newStoreObj.modalToggleFlag;
        
        
        return {...newStoreObj};
      },

      onChangeProduct:(_,data)=>{
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
    
      productFilteration: (_,data)=> {
        console.log("=>>",data);
        let newStoreObj={
          ..._
        }
     if(data.currentData.filterFlag==="true"){
         if(data.currentData.name!==""){
           
          newStoreObj.filteredProduct.items=newStoreObj.filteredProduct.items.filter((el)=>el.name.toUpperCase()===data.currentData.name.toUpperCase());
         }
        
     }
       else{
          newStoreObj.filteredProduct.items=newStoreObj.product;
       }
     console.log(newStoreObj);
       return{
          ...newStoreObj,
        }
      }
      ,
      loadFilteredProduct: (_, data) => {
        let newStoreObj = {
          ..._,
        };

        newStoreObj.filteredProduct.loading = true;
        newStoreObj.filteredProduct.items = data.filteredProduct;
        console.log(newStoreObj);
        return {
          ...newStoreObj,
        };
      },
      sortProduct: (_, data) => {
        console.log(data);
        let newStoreObj = {
          ..._,
        };
        newStoreObj.sortProductType[data.fieldName].ascending = !newStoreObj
          .sortProductType[data.fieldName].ascending;
        data.sortType = newStoreObj.sortProductType[data.fieldName].ascending;

        newStoreObj.filteredProduct.items = [
          ...sorting(newStoreObj.filteredProduct.items, data),
        ];
        console.log(newStoreObj.filteredProduct);

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
    events: ["loadProductData","searchProduct","addRecord", "deleteRecord", "editRecord"],
  }
);
