



import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const SuccessToastIcon = (props: SvgProps) => (

    <Svg
       width="24" 
       height="24" 
       viewBox="0 0 24 24" 
       fill="none" 
        {...props}
    >
        <Path
          d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
        />
        <Path d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
);
export default SuccessToastIcon;























