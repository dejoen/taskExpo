import { createSlice, PayloadAction } from "@reduxjs/toolkit"



 interface orderInfoUpdateProps {
    price:number,
    quantity:number,
  
 }
   

  export interface CartItemsProps {
    items:{
      cartItemId:number | string,
      cartItemTitle:string,
   cartItemImageUri:string,
   cartItemAmount:number,
   isInStock:boolean,
  quantity:number}[] ,

   orderInfo?:{

     subTotal:number,
     shipping:number,
     total:number


   },

   updateOrderInfo?:orderInfoUpdateProps

 }


 const  initialState:CartItemsProps = {
   
     items:[],
     orderInfo:{
      shipping:10,
      subTotal:0,
      total:0
     },
     updateOrderInfo:{
      price:0,
      quantity:1
     }
 }


 const cartSlice = createSlice({
    name:"cartItems",
    initialState,
    reducers:{
        updateCartItems(state,action:PayloadAction<CartItemsProps>){
          state.items= action.payload.items ?? state.items
         
        },

        updateOrderInfoIncreaseQuantity(state,action:PayloadAction<orderInfoUpdateProps>){

          
   

              const price = action.payload.price ?? state.updateOrderInfo?.price!!

               const quantity = action.payload.quantity ?? state.updateOrderInfo?.quantity!!

               


               if(price>0 && quantity>0){
                console.log('called')
 
                 const amount = price * quantity 
                 const subtotal = (state.orderInfo?.subTotal ?? 0) + amount 
                  const total=    subtotal  + (state.orderInfo?.shipping ?? 0 )

                  state.orderInfo = {
                    ...state.orderInfo!!,
                     subTotal:subtotal,
                     total:total

                  }
               }

               

               
              

               
               
           
           
        },
         updateOrderInfoDecreaseQuantity(state,action:PayloadAction<orderInfoUpdateProps>){

          
   
            
                    const price = action.payload.price ?? state.updateOrderInfo?.price!!

               const quantity = action.payload.quantity ?? state.updateOrderInfo?.quantity!!

               if(price>0 && quantity>0){
                
                 const subtotal = (state.orderInfo?.subTotal ?? 0 ) - price
                  const total=   (state.orderInfo?.total??0) - price



                   state.orderInfo = {
                    ...state.orderInfo!!,
                     subTotal:subtotal,
                     total:total

                  }
               }

               
               
           
           
        },

        updateCartItemAfterItemDeleted(state,action:PayloadAction<orderInfoUpdateProps>){

          
   
            
                    const price = action.payload.price ?? state.updateOrderInfo?.price!!

               const quantity = action.payload.quantity ?? state.updateOrderInfo?.quantity!!


               if(price>0 && quantity>0){
                
                 const totalAmount =  price * quantity
                 const  subtotal = (state.orderInfo?.subTotal??0) - totalAmount
                  const total=   (state.orderInfo?.total??0) - totalAmount



                   state.orderInfo = {
                    ...state.orderInfo!!,
                     subTotal:subtotal,
                     total:total

                  }
               }

               
               
           
           
        }

        
    }

 })

 export const {updateCartItems,updateOrderInfoIncreaseQuantity,updateOrderInfoDecreaseQuantity,updateCartItemAfterItemDeleted} =cartSlice.actions


 export default cartSlice.reducer