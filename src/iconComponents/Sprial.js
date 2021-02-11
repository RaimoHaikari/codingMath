import * as React from "react";

function SvgSprial(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 158.8 105.8"
      {...props}
    >
      <g stroke="#000">
        <path fill="none" stroke="none" d="M0 0h158.8v105.8H0z" />
        <circle cx={68.2} cy={50.5} r={28.9} fill="#500" strokeWidth={0.2} />
        <path
          d="M22.1 5.4C12.2 16.2 6.5 24.9 5.8 39.7 4.4 70 27.3 98.6 58.5 99.6c25 .8 48.6-18.4 48.9-44.2.2-20-15.4-38.9-36.1-38.5-8 .1-15.9 3.6-21.3 9.1L33.8 5zM66.2 21h0c15.5 0 28.1 12.6 28.1 28.1 0 15.5-12.6 28.1-28.1 28.1-15.5 0-28.1-12.6-28.1-28.1 0-15.5 12.5-28 28-28.1z"
          fill="none"
          strokeWidth={10}
        />
      </g>
    </svg>
  );
}

export default SvgSprial;
