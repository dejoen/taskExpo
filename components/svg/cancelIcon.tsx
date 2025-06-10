
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CancelIcon = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
   
    {...props}
  >
    <Path
      d="M17.25 6.75L6.75 17.25"
      stroke="#334155"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.75 6.75L17.25 17.25"
      stroke="#334155"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CancelIcon;
