import * as React from "react";

function SvgTupu(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 52.9 52.9"
      {...props}
    >
      <path fill="none" d="M0 0h52.9v52.9H0z" />
      <circle cx={20.1} cy={24.7} r={13.2} fill="#280b0b" />
      <g fill="#00f">
        <path d="M37.73 12.392l6.792 5.436-1.687 2.108-6.793-5.436zM36.5 28.9h8.7v2.7h-8.7zM36.5 3.6h8.7v2.7h-8.7z" />
      </g>
    </svg>
  );
}

export default SvgTupu;
