import React from 'react';
import classes from './svg.module.css';

function Close({cb, card}) {
    return (
        <svg 
            onClick={() => cb(card)}
            className={`${classes.svg} ${classes.close}`}
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 20L4 4" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M4 20L20 4" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
        </svg>
    );
}

export default Close;