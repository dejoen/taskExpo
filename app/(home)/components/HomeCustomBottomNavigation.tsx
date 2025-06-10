import CartIcon from "@/components/svg/BottomNavigation/CartIcon";
import FavouriteIcon from "@/components/svg/BottomNavigation/FavouriteIcon";
import HomeIcon from "@/components/svg/BottomNavigation/HomeIcon";
import ProfileIcon from "@/components/svg/BottomNavigation/ProfileIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RootReducer, store } from "@/store/initStore";
import React, { useEffect, useState } from "react";
import { Pressable, useWindowDimensions, View, ViewProps } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";

interface HomeCustomBottomNavigationProps extends ViewProps {
    children?: React.JSX.Element,
    toggleVisibility: boolean,
    onItemSelected: (itemPosition: number, title: string) => void


}


{
    /**
     * Custom Navbar with animated views
     */
}








export default function HomeCustomBottomNavigation({ onItemSelected, toggleVisibility, ...props }: HomeCustomBottomNavigationProps) {


    const [activeState, setActiveState] = useState({
        home: true,
        cart: false,
        favourite: false,
        profileIcon: false
    })


    const navItems: { itemIcon: React.JSX.Element, title: string }[] = [{
        itemIcon: <HomeIcon isActive={activeState.home} />,
        title: "Home"
    },
    {
        itemIcon: <CartIcon isActive={activeState.cart} />,
        title: "Cart"
    },
    {
        itemIcon: <FavouriteIcon isActive={activeState.favourite} />,
        title: "Favourite"
    }, {
        itemIcon: <ProfileIcon isActive={activeState.profileIcon} />,
        title: "profileIcon"
    }]




    const cartItems = useSelector((state: RootReducer) => state.cartItems.items!!)

    const opacityValue = useSharedValue(0)
    const yValue = useSharedValue(50)




    const { width } = useWindowDimensions()

    const activeStateAnimation = useSharedValue(0)




    const HomeCustomBottomNavigationAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacityValue.value,
        transform: [{ translateY: yValue.value }]

    }))

    const activeStateAnimationStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: activeStateAnimation.value }]
    }))


    const slideToHome = () => {
        activeStateAnimation.set(0)
        setActiveState({

            home: true,
            cart: false,
            favourite: false,
            profileIcon: false
        })
    }


    useEffect(() => {


        if (toggleVisibility) {



            runOnJS(() => {

                opacityValue.value = withTiming(1, { duration: 2000 })
                yValue.value = withTiming(0, { duration: 2000 })

            })()
        } else {

            runOnJS(() => {

                opacityValue.value = withTiming(0, { duration: 2000 })
                yValue.value = withTiming(50, { duration: 2000 }, () => {
                    runOnJS(slideToHome)()
                })


            })()

        }

    }, [toggleVisibility])





    return <Animated.View style={[HomeCustomBottomNavigationAnimatedStyle, { height: '10%', width: '100%', position: 'absolute', bottom: 0 }]} {...props} >

        <ThemedView style={[{ height: '100%', flexDirection: 'row', justifyContent: "space-between", padding: 16 }]} >

            <Animated.View style={[activeStateAnimationStyle, { backgroundColor: 'rgba(96, 181, 255, 1)', height: 2, width: 85, position: 'absolute', top: 0 }]} />

            {
                navItems.map((navItem, index) => (

                    <Pressable key={index} onPress={() => {

                        onItemSelected(index, navItem.title)

                        switch (index) {
                            case 0: {

                                activeStateAnimation.value = 0
                                setActiveState({

                                    home: true,
                                    cart: false,
                                    favourite: false,
                                    profileIcon: false
                                })
                                return
                            }

                            case 1: {

                                activeStateAnimation.value = 80
                                setActiveState({

                                    home: false,
                                    cart: true,
                                    favourite: false,
                                    profileIcon: false
                                })
                                return
                            }

                            case 2: {

                                activeStateAnimation.value = width * 0.46
                                setActiveState({

                                    home: false,
                                    cart: false,
                                    favourite: true,
                                    profileIcon: false
                                })
                                return
                            }

                            case 3: {

                                activeStateAnimation.value = width * 0.8

                                setActiveState({

                                    home: false,
                                    cart: false,
                                    favourite: false,
                                    profileIcon: true
                                })
                                return
                            }


                            default: activeStateAnimation.value = 0
                        }


                    }}>
                        {
                            cartItems.length > 0 && index === 1 && <View style={{ position: 'absolute', zIndex: 200, backgroundColor: 'rgba(60, 72, 86, 1)', bottom: '60%', left: 10, height: 23, width: 23, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}> <ThemedText lightColor="white" style={{ fontSize: 12 }}>{cartItems.length}</ThemedText> </View>
                        }

                        <View style={{ alignItems: 'center' }} >

                            {
                                navItem.itemIcon
                            }
                            <ThemedText lightColor={Object.keys(activeState).find((key) => {
                                return key.toLowerCase() === navItem.title.toLowerCase() && activeState[`${key}` as keyof typeof activeState]
                            }) ? 'rgba(96, 181, 255, 1)' : 'black'} style={{ fontFamily: 'IbmSans', fontSize: 12 }}>{navItem.title}</ThemedText>
                        </View>
                    </Pressable>
                ))
            }

        </ThemedView>



    </Animated.View>



}