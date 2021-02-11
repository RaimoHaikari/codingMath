import * as React from "react";

function SvgHupu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 52.9 52.9"
      {...props}
    >
      <path fill="#f4d7d7" fillOpacity={0.1} d="M0 0h52.9v52.9H0z" />
      <g fill="#00f">
        <circle cx={20.1} cy={24.7} r={13.2} />
        <path d="M36 23.1h8.7v2.7H36zM36 28.9h8.7v2.7H36zM36 35.4h8.7v2.7H36z" />
      </g>
    </svg>
  );
}

export default SvgHupu;
