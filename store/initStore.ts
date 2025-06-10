import { configureStore } from "@reduxjs/toolkit";
import {  combineReducers} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


import CustomAnimationReducer,{ CustomAnimationProps } from "./reducer/AnimationReducer";
import CartItemsReducer,{ CartItemsProps } from "./reducer/CartItems";


const persistConfig = {
    key:'root',
    storage,
   // whitelist:['user','cartItems']
}



 export interface RootReducer {
  customAnimation:CustomAnimationProps,
  cartItems:CartItemsProps
 }


const rootReducer =  combineReducers({
  customAnimation:CustomAnimationReducer,
  cartItems:CartItemsReducer
})


const persistedReducer = persistReducer(persistConfig,rootReducer)



const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})

const persistore = persistStore(store)




export  {store,persistore}