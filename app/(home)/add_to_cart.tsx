import PrimaryFilledButton from "@/components/PrimaryFilledButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { updateCustomAnimation } from "@/store/reducer/AnimationReducer";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Asset } from 'expo-asset'
import { RootReducer } from "@/store/initStore";
import { updateCartItems, updateOrderInfoIncreaseQuantity } from "@/store/reducer/CartItems";
import FavoriteIcon from "@/components/svg/favoriteIcon";
import GoBackIcon from "@/components/svg/goBackIcon";

export default function AddToCart() {


    const opacityAnimValue = useSharedValue(0)

    const translateYAnimValue = useSharedValue(-20)

    const router = useRouter()

    const dispatch = useDispatch()

    const cartItems = useSelector((state: RootReducer) => state.cartItems.items!!)



    const {

        id,
        cardItemPrice,
        cardItemDescription,
        cardItemImage,
        aboutItem
    } = useLocalSearchParams()

    const popUpbottomNavBar = useDispatch()

    const ddata = JSON.parse(aboutItem.toString())



    const bodyAinmationStyle = useAnimatedStyle(() => ({
        opacity: opacityAnimValue.value,
        transform: [{ translateY: translateYAnimValue.value }]
    }))


    const animatedBodyScreen = () => {

        opacityAnimValue.value = withTiming(1, { duration: 500 })
        translateYAnimValue.value = withTiming(0, { duration: 1000 })
    }

    const goBack = () => {
        dispatch(updateCustomAnimation({ makeSearchViewVisible: true }))
        router.push({
            pathname: '/(home)'
        })

    }

    const animateBodyScreenToNavigateBack = () => {
        popUpbottomNavBar(updateCustomAnimation({ makeBottomNavbarVisible: true, makeBottomNavbarInVisible: false }))

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

        const onBackPress = () => {



            router.replace({
                pathname: '/(home)'
            })


            return true
        }


        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)



        runOnJS(() => {

            animatedBodyScreen()
        })()

        return () => {
            opacityAnimValue.value = 0
            translateYAnimValue.value = -20

            backHandler.remove()


        }







    }, [])

    const [toggleAddToFavorite, setToggleAddToFavorite] = useState(false)






    return <Animated.View style={[bodyAinmationStyle, { flex: 1, boxSizing: 'border-box' }]}>

        <ThemedView style={{ flexDirection: 'row', padding: 10, alignItems: 'center', gap: 5 }}>

            <TouchableOpacity onPress={() => {
                animateBodyScreenToNavigateBack()
            }} >
                <GoBackIcon />
            </TouchableOpacity>
            <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '700' }}>Go back</ThemedText>
        </ThemedView>



        <PrimaryFilledButton title="Add to cart" style={{ backgroundColor: 'rgba(96, 181, 255, 1)', margin: 20, padding: 12, borderRadius: 10, alignItems: 'center', position: 'absolute', bottom: 1, width: '90%', alignSelf: 'center', zIndex: 400 }} onPress={() => {



            if (!cartItems) {


                dispatch(updateCartItems({ items: [{ cartItemTitle: cardItemDescription.toString(), cartItemAmount: Number(cardItemPrice.toString().replace(/[a-z A-z $]/g, '')), cartItemId: id.toString(), cartItemImageUri: cardItemImage.toString(), isInStock: true, quantity: 1 }] }))
                dispatch(updateOrderInfoIncreaseQuantity({ price: Number(cardItemPrice.toString().replace(/[a-z A-z $]/g, '')), quantity: 1 }))


            } else {

                const isCartItemAddedAlready = cartItems!!.find((item) => {
                    return item.cartItemId === id.toString()
                })

                if (isCartItemAddedAlready) {
                    dispatch(updateCustomAnimation({ showPopUpToast: true, popUpTitle: 'already  added to cart' }))
                    return
                }




                dispatch(updateCartItems({ items: [...cartItems!!, { cartItemTitle: cardItemDescription.toString(), cartItemAmount: Number(cardItemPrice.toString().replace(/[a-z A-z $]/g, '')), cartItemId: id.toString(), cartItemImageUri: cardItemImage.toString(), isInStock: true, quantity: 1 }] }))
                dispatch(updateOrderInfoIncreaseQuantity({ price: Number(cardItemPrice.toString().replace(/[a-z A-z $]/g, '')), quantity: 1 }))

            }





            dispatch(updateCustomAnimation({ showPopUpToast: true, popUpTitle: 'Item has been added to cart' }))

        }} />


        <View style={{ height: "83%" }}>


            <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>

                <View style={{ padding: 20,width:'100%' }}>

                    <TouchableOpacity style={{ position: 'absolute', zIndex: 300, right: 60, top: 30 }} onPress={() => {
                        setToggleAddToFavorite(!toggleAddToFavorite)
                    }}>
                        <FavoriteIcon isActive={toggleAddToFavorite} />
                    </TouchableOpacity>

                    <View style={{ height: 260,width:'100%', padding: 0 }}>

                        <Image source={{ uri: cardItemImage.toString() }} style={{ height: '100%', width: '100%',objectFit:'scale-down' }} />

                    </View>


                    <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '400' }}>{cardItemDescription}</ThemedText>

                    <ThemedText style={{ fontFamily: '', fontWeight: 'bold', marginTop: 15, fontSize: 26 }}>${cardItemPrice}.00</ThemedText>


                    <View style={{ padding: 8 }}>

                        <ThemedText style={{ color: 'rgba(153, 153, 153, 1)', fontSize: 14, fontFamily: 'IbmSans', fontWeight: '400' }}>About this item</ThemedText>


                        {
                            ddata && ddata.length > 0 && (ddata as string[]).map((itemDsc, index) => (
                                <View key={index} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', margin: 5 }}>
                                    <Text style={{ color: 'rgba(153, 153, 153, 1)', fontSize: 14, fontFamily: 'IbmSans', fontWeight: '400' }}>.</Text>
                                    <ThemedText style={{ color: 'rgba(153, 153, 153, 1)', fontSize: 14, fontFamily: 'IbmSans', fontWeight: '400', textAlign: 'justify' }} >{itemDsc}</ThemedText>
                                </View>

                            ))
                        }

                    </View>


                </View>
            </ScrollView>
        </View>








    </Animated.View>
}