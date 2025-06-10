import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

interface FavoriteIconProps extends SvgProps{
  isActive:boolean
 }

const FavoriteIcon = ({isActive,...props}:FavoriteIconProps) => (
  <Svg
    width={44}
    height={44}
    viewBox="0 0 44 44"
    fill="none"
    {...props}
  >
    <Rect width={44} height={44} rx={22} fill="white" />
    <Path
      d="M29.463 13.994C26.781 12.349 24.44 13.012 23.034 14.068C22.458 14.501 22.17 14.718 22 14.718C21.83 14.718 21.542 14.501 20.966 14.068C19.56 13.012 17.219 12.349 14.537 13.994C11.018 16.153 10.222 23.274 18.34 29.284C19.886 30.427 20.659 31 22 31C23.341 31 24.114 30.428 25.66 29.283C33.778 23.275 32.982 16.153 29.463 13.994Z"
       stroke={isActive ? 'red' :'black'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default FavoriteIcon;
