import * as React from "react";

function SvgTahti(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 158.8 105.8"
      {...props}
    >
      <path fill="none" d="M0 0h158.8v105.8H0z" />
      <text
        x={8.2}
        y={92.9}
        fontFamily="sans-serif"
        fontSize={10.583}
        letterSpacing={0.011}
        wordSpacing={0}
        style={{
          lineHeight: 1,
        }}
        strokeWidth={0.3}
      >
        <tspan
          x={8.2}
          y={92.9}
          fontFamily="Algerian"
          fontSize={70.556}
          style={{
            fontVariantCaps: "normal",
            fontVariantEastAsian: "normal",
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
          }}
        >
          {" A"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgTahti;
