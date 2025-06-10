import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateCustomAnimation } from "@/store/reducer/AnimationReducer";
import { Asset } from 'expo-asset'
import GoBackIcon from "@/components/svg/goBackIcon";

export default function Home() {







    const opacityAnimValue = useSharedValue(0)

    const translateYAnimValue = useSharedValue(-20)

    const dispatch = useDispatch()



    const bodyAinmationStyle = useAnimatedStyle(() => ({
        opacity: opacityAnimValue.value,
        transform: [{ translateY: translateYAnimValue.value }]
    }))


    const animatedBodyScreen = () => {
        opacityAnimValue.value = withTiming(1, { duration: 500 })
        translateYAnimValue.value = withTiming(0, { duration: 1000 })
    }




    useEffect(() => {

        {
            /**
             * Listen to back press evenr
             */
        }

        const onBackPress = () => {





            return true
        }


        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

        runOnJS(() => {

            animatedBodyScreen()
            dispatch(updateCustomAnimation({ makeBottomNavbarVisible: true, makeBottomNavbarInVisible: false, makeSearchViewVisible: true }))

        })()

        return () => {
            opacityAnimValue.value = 0
            translateYAnimValue.value = -20
            backHandler.remove()
        }

    }, [])










    const cardDetails = [{
        id: 0,
        cardItemImage: Asset.fromModule(require('../../assets/images/image1.png')).uri,
        cardItemPrice: 700,
        cardItemDescription: 'Apple iPhone 16 128GB|Teal',
        aboutItem: JSON.stringify(['This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers', 'There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length.'])


    }, {
        id: 1,
        cardItemImage: Asset.fromModule(require('../../assets/images/image2.jpg')).uri,
        cardItemPrice: 1000,
        cardItemDescription: 'M4 Macbook Air 13”256GB|Sky blue',
        aboutItem: JSON.stringify(['This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers', 'There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length.'])

    },


    {
        id: 2,
        cardItemImage: Asset.fromModule(require('../../assets/images/image3.png')).uri,
        cardItemPrice: 499,
        cardItemDescription: 'Google Pixel 9A128GB|Iris',
        aboutItem: JSON.stringify(['This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers', 'There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length.'])

    },
    {
        id: 3,
        cardItemImage: Asset.fromModule(require('../../assets/images/image4.jpg')).uri,
        cardItemPrice: 1290,
        cardItemDescription: 'Apple Airpods 4Active Noise Cancellation|Teal',
        aboutItem: JSON.stringify(['This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers', 'There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length.'])

    }]


    const listViewOpacityValue = useSharedValue(0)



    const listViewAnimation = useAnimatedStyle(() => ({
        opacity: listViewOpacityValue.value,

    }))



    const d = ({ item }: any) => (
        <CustomProductCardView item={item} hideFlatList={() => {

        }} />
    )




    return <Animated.View style={[bodyAinmationStyle, { flex: 1, }]}>

        <ThemedView style={{ flexDirection: 'row', padding: 10, alignItems: 'center', gap: 5 }}>

            <GoBackIcon/>
            <ThemedText style={{ fontFamily: 'IbmSans', fontWeight: '700' }}>Technology</ThemedText>
        </ThemedView>




        <View style={[listViewAnimation, { padding: 10, justifyContent: 'center', height: '80%' }]}>


            <Animated.FlatList showsVerticalScrollIndicator={false} keyExtractor={(item) => item.id.toString()} alwaysBounceVertical data={cardDetails} renderItem={d} ListHeaderComponent={

                <View style={{ width: "70%" }}>
                    <ThemedText style={{ fontWeight: '500', fontSize: 18, lineHeight: 35, fontFamily: 'IBMPlexMono-BoldItalic' }}>Smartphones, Laptops & Assecories</ThemedText>
                </View>} numColumns={2} >


            </Animated.FlatList>



        </View>









    </Animated.View>
}


const CustomProductCardView = ({ item, hideFlatList }: any) => {

    const router = useRouter()

    const dispatch = useDispatch()

    const scaleValue = useSharedValue(1)
    const opacityValue = useSharedValue(1)
    const x = useSharedValue(0)
    const y = useSharedValue(0)

    const cardAnimationStyle = useAnimatedStyle(() => ({

        transform: [{ scale: scaleValue.value }],
        opacity: opacityValue.value,
        zIndex: x.value,






    }))



    const {
        styleProp,
        id,
        cardItemImage,
        cardItemPrice,
        cardItemDescription,
        aboutItem

    } = item



    const moveToNextScreen = () => {

        dispatch(updateCustomAnimation({ makeSearchViewVisible: false }))
        router.replace({
            pathname: '/(home)/add_to_cart',
            params: { id, cardItemPrice, cardItemDescription, aboutItem, cardItemImage }
        })

        x.value = 0
        opacityValue.value = 1
        scaleValue.value = 1
    }


    return <Animated.View style={[cardAnimationStyle, { height: 250, width: '48%', margin: 5, alignItems: 'center' }]} >

        <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={(e) => {
            dispatch(updateCustomAnimation({ makeBottomNavbarInVisible: true, makeBottomNavbarVisible: true }))

            x.value = 900

            opacityValue.value = withTiming(0.9, { duration: 200 }, () => {

            })

            scaleValue.value = withTiming(10, { duration: 100 }, () => {
                runOnJS(moveToNextScreen)()
            })
        }}>

            <View style={{ height: 150 }}>
                <Image source={{ uri: cardItemImage }} style={{ height: '100%', width: '100%',objectFit:'scale-down' }} />
            </View>



            <ThemedText numberOfLines={2} ellipsizeMode="tail" style={{ fontWeight: '400', fontSize: 14, width: '73%', fontFamily: 'IbmSans', height: '20%' }}>{cardItemDescription}</ThemedText>


            <ThemedText style={{ marginTop: 8, fontWeight: 900, color: 'black', fontSize: 16, fontFamily: 'IBMPlexSans-Bold' }}>${cardItemPrice}.00</ThemedText>

        </TouchableOpacity>


    </Animated.View>
}