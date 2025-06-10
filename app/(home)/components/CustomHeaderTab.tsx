import NotificationIcon from "@/components/svg/NotificationIconIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View, TextInput, DimensionValue, useColorScheme } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface CustomHeaderTabProps {
    toggleVisibility:boolean
}

export default function CustomHeaderTab({toggleVisibility}:CustomHeaderTabProps) {

    const searchAnimatedOpacity = useSharedValue(1)
    const searchAnimatedDisplay = useSharedValue<'flex'| 'none'>('flex')
    const searchAnimatedHeight = useSharedValue<DimensionValue>(40)
    const colorScheme =useColorScheme()

    const searchAnimationStyle = useAnimatedStyle(()=>({
        height:searchAnimatedHeight.value,
        opacity:searchAnimatedOpacity.value
        
    }))

    const onHideAnimEnded = () =>{
       // searchAnimatedDisplay.value = 'none'
    }

    const hideSearchView = () =>{
        searchAnimatedOpacity.value = withTiming(0,{duration:1500},()=>{
        runOnJS(onHideAnimEnded)()
        })
        searchAnimatedHeight.value = withTiming(0,{duration:1000})
    }

    const showSearchView = () => {
        searchAnimatedHeight.value = withTiming(40,{duration:1000})
        searchAnimatedOpacity.value = withTiming(1,{duration:1000},()=>{
       
        })

    }

    useEffect(()=>{
       
       if(toggleVisibility){
        showSearchView()
     
       }else{
        
        hideSearchView()
       }
    },[toggleVisibility])

   return  <ThemedView lightColor="">

        <View style={{ width: '100%', paddingTop: 10 }}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>



                <View style={{ backgroundColor: 'rgba(147, 197, 253, 1)', width: 80, height: 33, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderColor: 'rgba(37, 99, 235, 1)', borderWidth: 1 }}>
                    <ThemedText>
                        Full Logo
                    </ThemedText>
                </View>




                <View style={{ gap: 8 }}>

                    <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '600', fontSize: 12, textAlign: 'center' }}
                    >DELIVERY ADDRESS</ThemedText>





                </View>


                <NotificationIcon />


            </View>

            <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '600', fontSize: 11, textAlign: 'center', marginStart: '12%', marginTop: 10 }}
            >Umuezike Road, Oyo State</ThemedText>



            <Animated.View style={[searchAnimationStyle,{ borderWidth: 0.3, borderColor:colorScheme==="dark"?'white':'black', margin: 20, padding: '2%', borderRadius: 3, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>

                <Ionicons name="search" size={20} color={colorScheme==="dark"?'white':'black'} />

                <TextInput placeholder="Search...." style={{height:100,color:colorScheme==="dark"?'white':'black'}} placeholderTextColor={colorScheme==="dark"?'white':'black'} />
            </Animated.View>

        </View>

    </ThemedView>

}