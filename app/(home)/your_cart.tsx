import PrimaryFilledButton from "@/components/PrimaryFilledButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RootReducer } from "@/store/initStore";
import { updateCustomAnimation } from "@/store/reducer/AnimationReducer";
import {  Ionicons } from "@expo/vector-icons";
import {  useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import CustomCartItemHolder from "./components/CustomCartItemHolder";
import GoBackIcon from "@/components/svg/goBackIcon";



export default function YourCart() {


    const opacityAnimValue = useSharedValue(0)

    const translateYAnimValue = useSharedValue(-20)

    const router = useRouter()


    const cartItems = useSelector((state: RootReducer) => state.cartItems.items)
    const orderInfo = useSelector((state: RootReducer) => state.cartItems.orderInfo)


    const popUpbottomNavBar = useDispatch()



    const bodyAinmationStyle = useAnimatedStyle(() => ({
        opacity: opacityAnimValue.value,
        transform: [{ translateY: translateYAnimValue.value }]
    }))

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-Us', {
            maximumFractionDigits: 2,
            minimumSignificantDigits: 2
        }).format(amount)
    }

    const animatedBodyScreen = () => {

        opacityAnimValue.value = withTiming(1, { duration: 500 })
        translateYAnimValue.value = withTiming(0, { duration: 1000 })
    }

    const goBack = () => {


        router.push({
            pathname: '/(home)'
        })
        popUpbottomNavBar(updateCustomAnimation({ makeBottomNavbarVisible: true, makeBottomNavbarInVisible: false, makeSearchViewVisible: true }))


    }

    const animateBodyScreenToNavigateBack = () => {

        opacityAnimValue.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(goBack)()
        })
        translateYAnimValue.value = withTiming(-20, { duration: 1000 })
    }

    useEffect(() => {

         {
            /**
             * Listen to back press evenr
             */
        }

         const onBackPress = () =>{


            router.replace({
                pathname:'/(home)'
            })

            
        return true
    }

      const  backHandler = BackHandler.addEventListener('hardwareBackPress',onBackPress)


        runOnJS(() => {

            animatedBodyScreen()
        })()

        return () => {
            opacityAnimValue.value = 0
            translateYAnimValue.value = -20
               backHandler.remove()
        }

    }, [])



    return <Animated.View style={[bodyAinmationStyle, { flex: 1, boxSizing: 'border-box' }]}>

        <ThemedView style={{ flexDirection: 'row', padding: 10, alignItems: 'center', gap: 5 }}>

            <TouchableOpacity  onPress={() => {
                animateBodyScreenToNavigateBack()

            }} >
                <GoBackIcon/>
            </TouchableOpacity>
            <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '700' }}>Your Cart</ThemedText>
        </ThemedView>



        <PrimaryFilledButton title={`Checkout ( ${formatAmount(orderInfo?.total ?? 0)} )`} style={{ backgroundColor: 'rgba(96, 181, 255, 1)', margin: 20, padding: 12, borderRadius: 10, alignItems: 'center', position: 'absolute', bottom: 1, width: '90%', alignSelf: 'center', zIndex: 400 ,}} />


        <View style={{ height: "58%" }}>


            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 10 }}>

                {
                    cartItems && cartItems.length > 0 && cartItems.map(({ cartItemAmount, cartItemId, cartItemImageUri, cartItemTitle, isInStock }) => (

                        <CustomCartItemHolder key={cartItemId} isInStock={isInStock} cartItemAmount={cartItemAmount} cartItemId={cartItemId} cartItemImageUri={cartItemImageUri} cartItemTitle={cartItemTitle} />
                    ))
                }

            </ScrollView>
        </View>


        <ThemedView style={{ height: 400, width: '100%', padding: 10, gap: 8 }}>

            <ThemedText style={{fontFamily:'IBMPlexSans-Bold'}}>Order Info</ThemedText>

            <View style={{ flexDirection: 'row' }}>
                <ThemedText  style={{fontFamily:'IBMPlexSans-Bold', fontSize:14}}>Subtotal</ThemedText>

                <View style={{ alignItems: 'flex-end', width: '80%' }}>
                    <ThemedText  style={{fontFamily:'IBMPlexSans-Bold'}} >${formatAmount(orderInfo?.subTotal ?? 0)}</ThemedText>
                </View>
            </View>


            <View style={{ flexDirection: 'row' }}>
                <ThemedText  style={{fontFamily:'IBMPlexSans-Bold', fontSize:14}}>Shipping</ThemedText>

                <View style={{ alignItems: 'flex-end', width: '80%' }}>
                    <ThemedText style={{fontFamily:'IBMPlexSans-Bold'}} >${formatAmount(orderInfo?.shipping ?? 0)}</ThemedText>
                </View>
            </View>



            <View style={{ flexDirection: 'row' }}>

                <ThemedText  style={{fontFamily:'IBMPlexSans-Bold', fontSize:14}}>Total</ThemedText>

                <View style={{ alignItems: 'flex-end', width: '88%' }}>
                    <ThemedText  style={{fontFamily:'IBMPlexSans-Bold'}}>${formatAmount(orderInfo?.total ?? 0)}</ThemedText>
                </View>
            </View>


        </ThemedView>








    </Animated.View>
}