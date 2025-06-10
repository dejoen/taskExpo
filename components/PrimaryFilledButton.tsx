import React, { Children } from "react";
import { Button, DimensionValue, FlexAlignType, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemedText } from "./ThemedText";


interface  PrimaryFilledButtonProps extends TouchableOpacityProps {

    title:string,
   
}
export default function PrimaryFilledButton ({title,...props}:PrimaryFilledButtonProps) {


return <TouchableOpacity  {...props}  >
        <ThemedText lightColor="white" style={{fontFamily:'IBMPlexSans-Bold'}}>{title}</ThemedText>
</TouchableOpacity>


}