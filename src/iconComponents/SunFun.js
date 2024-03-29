import * as React from "react";

/*
 * circle cx="6.6" cy="6.6" r="5" stopColor="#000000" fill ="#dd4814" strokeWidth ="0.9"/>    
 */
function SunFun() {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 13.2 13.2"
        width="2em"
        height="2em"
    >
        <path stroke="orange" strokeWidth="0.5" d="m11.616 6.6951-1.2369 0.69102 0.8648 1.1223-1.403 0.19752 0.40098 1.3589-1.3796-0.32264-0.117 1.412-1.1699-0.79924-0.61918 1.2744-0.8022-1.1679-1.0377 0.96467-0.32614-1.3788-1.3161 0.52465 0.19397-1.4035-1.4168 0.01378 0.68788-1.2387-1.3261-0.49895 1.0889-0.90653-1.0563-0.9443 1.3428-0.45197-0.64385-1.2621 1.4154 0.063643-0.14445-1.4095 1.2969 0.57066 0.37447-1.3665 1.0031 1.0006 0.84281-1.1389 0.57394 1.2954 1.1973-0.75756 0.067228 1.4153 1.3901-0.27388-0.44856 1.344 1.3952 0.24679-0.90377 1.0912z" fill="yellow" stopColor="#000000"/>    
    </svg>
  );
}

export default SunFun;
