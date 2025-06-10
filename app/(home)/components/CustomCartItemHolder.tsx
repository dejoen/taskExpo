import AddMore from "@/components/svg/addIcon";
import DeleteIcon from "@/components/svg/deleteIcon";
import MinusIcon from "@/components/svg/minusIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RootReducer } from "@/store/initStore";
import { updateCartItemAfterItemDeleted, updateCartItems, updateOrderInfoDecreaseQuantity, updateOrderInfoIncreaseQuantity } from "@/store/reducer/CartItems";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, useColorScheme, useWindowDimensions, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";


interface CustomCartItemHolderProps {
    cartItemId: number | string,
    cartItemTitle: string,
    cartItemImageUri: string,
    cartItemAmount: number,
    isInStock: boolean
}

export default function CustomCartItemHolder({ cartItemAmount, cartItemTitle, cartItemImageUri, cartItemId }: CustomCartItemHolderProps) {



    const dispatch = useDispatch()





    const cartItems = useSelector((state: RootReducer) => state.cartItems.items)

    const [itemQuantity, setItemQuantity] = useState(cartItems!!.find(item => item.cartItemId === cartItemId)?.quantity!!)


    const {width} = useWindowDimensions()



    useEffect(() => {

        setItemQuantity(cartItems!!.find(item => item.cartItemId === cartItemId)?.quantity!!)

    }, [cartItems])


     const deleteAnimTranslateXValue = useSharedValue(0)

     const deleteAnimOpacity = useSharedValue(1)

      const colorScheme = useColorScheme()

     const  deleteAnimStyle = useAnimatedStyle(()=>({
        opacity:deleteAnimOpacity.value,
        transform:[{translateX:deleteAnimTranslateXValue.value}]
     }))

     const onItemDeletedAnimationEnded = () =>{

         if(cartItems){
          let updatedItem =  cartItems
       
           updatedItem = updatedItem.filter( item =>item.cartItemId!==cartItemId)
          dispatch(updateCartItemAfterItemDeleted({price:cartItems.find(item=>item.cartItemId===cartItemId)?.cartItemAmount!!,quantity:cartItems.find(item=>item.cartItemId===cartItemId)?.quantity!!}))
            dispatch(updateCartItems({items:updatedItem}))
      
         }

     }

     const  deleteItemAnimate = () =>{
        deleteAnimOpacity.value = withTiming(0,{duration:1000})
        deleteAnimTranslateXValue.value = withTiming(width,{duration:1000},()=>{
             runOnJS(onItemDeletedAnimationEnded)()
        })

     }


    return <Animated.View  style={[deleteAnimStyle,{ height: 160, borderRadius: 10, width: '100%',flexDirection: 'row', gap: 20, padding: 10, backgroundColor:colorScheme==="light"?'rgba(246, 245, 248, 1)':'black'}]}>

        <View style={{ width: '20%', height: 90, marginTop: 25 }}>
            <Image source={{ uri: cartItemImageUri }} style={{ height: '100%', width: '100%',objectFit:'scale-down' }} />
        </View>


        <View>
            <ThemedText  numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12, width: '90%', fontFamily:'SFProText-Regular' }}>{cartItemTitle}</ThemedText>
            <ThemedText  style={{fontFamily:'SFProText-Regular'}}>{cartItemAmount}</ThemedText>
            <ThemedText style={{ color: 'green',fontFamily:'SFProText-Regular', fontSize:12}}>In stock</ThemedText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 20 }}>

                <TouchableOpacity style={{ backgroundColor: 'rgba(226, 232, 240, 1)', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                    if (itemQuantity === 0) {
                        return
                    }

                    const update = cartItems!!.map((item) => {

                        if (item.cartItemId === cartItemId) {
                            return {
                                ...item,
                                quantity: itemQuantity - 1
                            }
                        }

                        return item
                    })

                    dispatch(updateCartItems({ items: update }))
                    dispatch(updateOrderInfoDecreaseQuantity({ price: Number(cartItemAmount.toString().replace(/[a-z A-z $]/g, '')), quantity: 1 }))

                }}>

                    <MinusIcon />
                </TouchableOpacity>

                <ThemedText  style={{fontFamily:'SFProText-Regular'}} >{itemQuantity}</ThemedText>

                <TouchableOpacity style={{ backgroundColor: 'white', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => {


                    const update = cartItems!!.map((item) => {

                        if (item.cartItemId === cartItemId) {
                            return {
                                ...item,
                                quantity: itemQuantity + 1
                            }
                        }

                        return item
                    })



                    dispatch(updateCartItems({ items: update }))
                    dispatch(updateOrderInfoIncreaseQuantity({ price: Number(cartItemAmount.toString().replace(/[a-z A-z $]/g, '')), quantity: 1 }))
                }}>

                    <AddMore  />


                </TouchableOpacity>


                <View style={{ backgroundColor: 'white', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginStart: 30 }}>

                    <TouchableOpacity onPress={()=>{
                           deleteItemAnimate()
                    }}>
                        <DeleteIcon />
                    </TouchableOpacity>


                </View>

            </View>
        </View>


    </Animated.View>

}