
import * as React from "react";
import { useColorScheme } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

 interface HomeIconProps extends SvgProps{
  isActive:boolean
 }


const HomeIcon = ({isActive,...props}:HomeIconProps) => {
  

     const colorScheme = useColorScheme()
 return <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    
    {...props}
  >
    <Path
      d="M7.088 4.762L6.088 5.543C4.572 6.727 3.813 7.319 3.407 8.153C3 8.988 3 9.952 3 11.88V13.972C3 17.756 3 19.648 4.172 20.824C5.344 22 7.229 22 11 22H13C16.771 22 18.657 22 19.828 20.824C20.999 19.648 21 17.756 21 13.971V11.881C21 9.952 21 8.988 20.593 8.153C20.186 7.319 19.428 6.727 17.912 5.543L16.912 4.763C14.552 2.92 13.372 2 12 2C10.628 2 9.448 2.92 7.088 4.762Z"
      stroke={isActive ? 'rgba(96, 181, 255, 1)' :colorScheme==='dark'?'white':'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
};
export default HomeIcon;
