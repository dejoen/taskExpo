
import { Stack, useRouter } from "expo-router";
import CustomHeaderTab from "./components/CustomHeaderTab";
import HomeCustomBottomNavigation from "./components/HomeCustomBottomNavigation";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import Svg, { Line } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/store/initStore";
import { updateCustomAnimation } from "@/store/reducer/AnimationReducer";
import PopUpNotification from "./components/PopUpNotification";

export default function Home_Layout() {

  const [toggle, setToggle] = useState<boolean>(true)


  const [togglePopUp, setTogglePopUp] = useState<boolean>(false)

    const [toggleSearchView, setToggleSearchView] = useState<boolean>(false)

  const dispatch = useDispatch()


  const animationState = useSelector((state: RootReducer) => state.customAnimation)

 



  useEffect((() => {

    if (animationState.makeBottomNavbarVisible) {
      setToggle(true)
    }

    if (animationState.makeBottomNavbarInVisible) {
      setToggle(false)
    }

    


   
    


  }), [animationState])

  useEffect(()=>{

  },[])


  const router = useRouter()


  return <ThemedView lightColor="" style={{ flex: 1, }}>

    <CustomHeaderTab toggleVisibility= {animationState.makeSearchViewVisible!!} />


    <Svg height={'2'} width={'100%'}>

      <Line strokeWidth={4} stroke={'rgba(226, 232, 240, 1)'} fill={'black'} x1={'0'} y1={'0'} x2={'100%'} y2={'0'} />
    </Svg>

    <Stack >

      <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade' }} />

      <Stack.Screen name="add_to_cart" options={{ headerShown: false, animation: 'fade' }} />

      <Stack.Screen name="your_cart" options={{ headerShown: false, animation: 'fade' }} />
    </Stack>

    {
      /**
       * Custom Bottom Navigation
       */
    }

    <HomeCustomBottomNavigation toggleVisibility={toggle} onItemSelected={(_,title)=>{
       
       switch(title){

        case 'Home':{
        
          router.replace({
            pathname:'/(home)'
          })
          return
        }

        case 'Cart':{
          router.replace({
            pathname:'/(home)/your_cart'
          })
          dispatch(updateCustomAnimation({makeBottomNavbarVisible:false,makeBottomNavbarInVisible:true,makeSearchViewVisible:false}))
          
          
          return
        }

        default : ''
       }
    }}/>

   <PopUpNotification isShowPopUp={animationState.showPopUpToast!!} title={animationState.popUpTitle!!}/>

  </ThemedView>

}