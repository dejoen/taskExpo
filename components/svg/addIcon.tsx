import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const AddMore = (props:SvgProps) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
   fill={'none'}
    {...props}
  >
    <Path
      d="M7.87382 1.33333V14.6667M1.20715 7.99999H14.5405"
      stroke="#334155"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddMore;
