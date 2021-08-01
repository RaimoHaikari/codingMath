import * as React from "react";

function SvgHero(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 396.87 171.98"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x={179.668}
        y={82.974}
        fontFamily="Stencil"
        fontSize={10.583}
        letterSpacing={0.011}
        strokeWidth={0.265}
        wordSpacing={0}
        style={{
          fontVariantCaps: "normal",
          fontVariantEastAsian: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          lineHeight: 1.25,
        }}
      >
        <tspan
          x={179.668}
          y={82.974}
          style={{
            fontVariantCaps: "normal",
            fontVariantEastAsian: "normal",
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
          }}
        >
          {"CODING"}
        </tspan>
        <tspan
          x={179.668}
          y={96.203}
          style={{
            fontVariantCaps: "normal",
            fontVariantEastAsian: "normal",
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
          }}
        >
          {"MATH"}
        </tspan>
      </text>
      <g fill="#dd4814" strokeLinecap="round" strokeWidth={0.064}>
        <path d="M127.47 47.114l18.71-18.709 18.708 18.709-18.709 18.708zM168.633 125.693l18.709-18.708 18.708 18.708-18.708 18.709zM148.056 105.116l18.709-18.708 18.708 18.708-18.708 18.709zM148.055 67.698l18.708-18.709 18.709 18.709-18.709 18.708z" />
      </g>
    </svg>
  );
}

export default SvgHero;
