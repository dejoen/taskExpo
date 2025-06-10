import CancelIcon from "@/components/svg/cancelIcon";
import SuccessToastIcon from "@/components/svg/goodIcon";
import { ThemedText } from "@/components/ThemedText";
import { store } from "@/store/initStore";
import { updateCustomAnimation } from "@/store/reducer/AnimationReducer";
import { useEffect } from "react";
import {  TouchableOpacity, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface PopUpNotificationProps {
  isShowPopUp:boolean,
  title:string
}


export default function PopUpNotification({isShowPopUp,title}:PopUpNotificationProps) {


    const translateYValue = useSharedValue(10)

    const  display = useSharedValue<'none'|'flex'>('none')


    const popUpAnimationStyle = useAnimatedStyle(()=>({
        transform:[{translateY:translateYValue.value}],
        display:display.value
         
       
    }))


     const  showPopUp = () => {
         display.value = 'flex'
         translateYValue.value = withTiming(100,{duration:1500},()=>{
            runOnJS(hidePopUp)()
         })
     }

     const updateAnimState = () =>{
         display.value = 'none'
        store.dispatch(updateCustomAnimation({showPopUpToast:false}))
     }

     const  hidePopUp = () => {
       
         translateYValue.value = withTiming(-300,{duration:1500},()=>{
            
            runOnJS(updateAnimState)()
           
         })
         
     }


     useEffect(()=>{
         if(isShowPopUp){
            showPopUp()
         }
     },[isShowPopUp])

    return <Animated.View style={[popUpAnimationStyle,{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', shadowColor: 'black', shadowRadius: 6, shadowOpacity: 0.4, height: 55, width: '90%', alignSelf: 'center', borderRadius: 10,borderStartColor: 'green', borderStartWidth: 5, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 6 }]}>

        <SuccessToastIcon />

        <View style={{ width: '70%' }}>

            <ThemedText style={{ textAlign: 'center', alignSelf: 'center' }}>{title}</ThemedText>
        </View>

        <TouchableOpacity style={{ position: 'absolute', end: 20 }} onPress={()=>{
            hidePopUp()
        }}>
            <CancelIcon />
        </TouchableOpacity>


    </Animated.View>


}