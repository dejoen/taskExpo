import { createSlice, PayloadAction } from "@reduxjs/toolkit"



   

  export interface CustomAnimationProps {
   makeBottomNavbarVisible?:boolean,
   makeBottomNavbarInVisible?:boolean,
   showPopUpToast?:boolean,
   popUpTitle?:string,
   makeSearchViewVisible?:boolean
 }

 const  initialState:CustomAnimationProps = {
   makeBottomNavbarInVisible:false,
   makeBottomNavbarVisible:true,
   showPopUpToast:false,
   popUpTitle:'Item has been added to cart',
   makeSearchViewVisible:true
 }


 const userSlice = createSlice({
    name:"customAnimation",
    initialState,
    reducers:{
        updateCustomAnimation(state,action:PayloadAction<CustomAnimationProps>){
          state.makeSearchViewVisible = action.payload.makeSearchViewVisible ?? state.makeSearchViewVisible
           state.showPopUpToast = action.payload.showPopUpToast ?? state.showPopUpToast
           state.makeBottomNavbarInVisible = action.payload.makeBottomNavbarInVisible ?? state.makeBottomNavbarInVisible
           state.makeBottomNavbarVisible = action.payload.makeBottomNavbarVisible ?? state.makeBottomNavbarVisible
           state.popUpTitle = action.payload.popUpTitle ?? state.popUpTitle
        }
    }

 })

 export const {updateCustomAnimation} =userSlice.actions


 export default userSlice.reducer