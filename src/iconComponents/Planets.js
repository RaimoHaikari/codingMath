import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

const Svg = styled(Icon)`
    width: 24px;
    height: 24px;
`;

export const Caleuche = ({ className }) => ( 
    <Svg viewBox="0 0 13.2 13.2" className={className}>
        <circle cx="6.6" cy="6.6" r="6" stopColor="#000000" fill ="#dd4814" strokeWidth ="0.9"/>
        <g fill="none" stroke="#000">
            <g strokeWidth="0.1">
                <ellipse cx="4" cy="4.3" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="4.8" cy="8.5" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="7.5" cy="6.3" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="3.1" cy="6.8" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="3.1" cy="6.8" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="7.5" cy="6.3" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="9.3" cy="8.6" rx="0.4" ry="0.4" stopColor="#000000"/>
                <ellipse cx="9.3" cy="8.6" rx="0.4" ry="0.4" stopColor="#000000"/>
            </g>
            <g strokeWidth="0.2">
                <ellipse cx="8.8" cy="4.6" rx="0.9" ry="0.9" stopColor="#000000"/>
                <ellipse cx="8.8" cy="4.6" rx="0.9" ry="0.9" stopColor="#000000"/>
                <ellipse cx="5.6" cy="10.3" rx="0.9" ry="0.9" stopColor="#000000"/>
            </g>
        <ellipse cx="5" cy="2.8" rx="0.2" ry="0.2" stopColor="#000000" strokeWidth="0.04"/>
        <ellipse cx="2.7" cy="4.7" rx="0.2" ry="0.2" stopColor="#000000" strokeWidth="0.04"/>
        </g>
    </Svg>
);

export const Saffar = ({ className }) => ( 
    <Svg viewBox="0 0 13.2 13.2" className={className}>
        <circle cx="6.6" cy="6.6" r="5" stopColor="#000000" fill="#77216f" strokeWidth="0.04" stroke="#000"/>
        <g shapeRendering="auto">
                <path transform="scale(0.26458)" d="m7.4 0c-0.3 0-0.7 0-1.1 0-0.8 0-1.9 0-4 0a5 0 0 0 1 0 0c2.1 0 3.2 0 4 0 0.5 0 0.8 0 1.2 0a5 0 0 0 1-0.1 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m9 0c-1.1 0-2.4 0-3.6 0-0.5 0-1 0-1.4 0a5 0 0 0 1 0.1 0c0.4 0 0.9 0 1.3 0 1.2 0 2.4 0 3.5 0 0.4 0 0.8 0 1.1 0a5 0 0 0 1 0.1 0c-0.4 0-0.8 0-1.2 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m9.3 0c-2.3 0-4.9 0-7.7 0a5 0 0 0 1 0 0c2.8 0 5.5 0 7.8 0a5 0 0 0 1-0.1 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m11.3 0c-2.4 0-5.3 0-8.1 0a5 0 0 0 1 0.1 0c2.9 0 5.6 0 8.1 0a5 0 0 0 1 0 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m11.6 0c-3 0-6.2 0-9.2 0a5 0 0 0 1 0 0c3.1 0 6.2 0 9.2 0a5 0 0 0 1 0 0 5 0 0 0 1 0 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m10.7 0c-2.9 0-5.9 0-9 0a5 0 0 0 1 0 0c3.1 0 6.2 0 9.1 0a5 0 0 0 1 0 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
                <path transform="scale(0.26458)" d="m11.3 0c-0.5 0-1 0-1.5 0-0.7 0-1.3 0-1.7 0-0.2 0-0.4 0-0.5 0-0.1 0-0.1 0-0.1 0 0 0 0 0 0 0 0.1 0 0.2 0 0.4 0s0.4 0 0.7 0c0.5 0 1.2 0 1.9 0 0.4 0 0.7 0 1.1 0a5 0 0 0 1 0 0c-0.3 0-0.7 0-1.1 0-0.7 0-1.3 0-1.9 0-0.3 0-0.5 0-0.7 0-0.2 0-0.3 0-0.4 0 0 0 0 0 0 0 0 0 0 0 0.1 0 0.1 0 0.3 0 0.5 0 0.4 0 1.1 0 1.7 0 0.5 0 1 0 1.5 0a5 0 0 0 1 0 0z" colorRendering="auto" dominantBaseline="auto" imageRendering="auto" stopColor="#000000"/>
        </g>
    </Svg>
);

export const Sun = ({ className }) => ( 
    <Svg viewBox="0 0 13.2 13.2" className={className}>
        <path stroke="orange" strokeWidth="0.5" d="m11.616 6.6951-1.2369 0.69102 0.8648 1.1223-1.403 0.19752 0.40098 1.3589-1.3796-0.32264-0.117 1.412-1.1699-0.79924-0.61918 1.2744-0.8022-1.1679-1.0377 0.96467-0.32614-1.3788-1.3161 0.52465 0.19397-1.4035-1.4168 0.01378 0.68788-1.2387-1.3261-0.49895 1.0889-0.90653-1.0563-0.9443 1.3428-0.45197-0.64385-1.2621 1.4154 0.063643-0.14445-1.4095 1.2969 0.57066 0.37447-1.3665 1.0031 1.0006 0.84281-1.1389 0.57394 1.2954 1.1973-0.75756 0.067228 1.4153 1.3901-0.27388-0.44856 1.344 1.3952 0.24679-0.90377 1.0912z" fill="yellow" stopColor="#000000"/>    
    </Svg>
);