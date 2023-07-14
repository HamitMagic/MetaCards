import React from 'react';
import classes from './svg.module.css';

function Resize({onMouseDown, onMouseUp}) {


    return (
        <svg 
            className={`${classes.svg} ${classes.resize}`}
            width="16" 
            height="16"
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6.0002 4.80005L19.2002 18" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" />
            <path d="M19.2002 6.30005V18.3H7.2002" stroke="#343641" strokeWidth="2" strokeLinejoin="round"></path>
        </svg>
    );
}

export default Resize;