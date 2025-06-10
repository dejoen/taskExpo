import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const GoBackIcon = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
   
    {...props}
  >
    <Path
      d="M13.25 8.75L9.75 12L13.25 15.25"
      stroke="#64748B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default GoBackIcon;
