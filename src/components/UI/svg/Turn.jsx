import React from 'react';
import classes from './svg.module.css';

function Turn({cb, id}) {
    return (
        <svg 
            id={id}
            className={`${classes.svg} ${classes.turn}`}
            onClick={() => cb()}
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M13.75 16.225C16.4667 15.5333 18.3333 14.125 18.3333 12.5C18.3333 11.45 17.5584 10.4916 16.275 9.7583" 
                stroke="#343641" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
            />
            <path 
                d="M9.99984 16.6666C5.39984 16.6666 1.6665 14.8 1.6665 12.5C1.6665 11.45 2.44148 10.4916 3.72481 9.7583" 
                stroke="#343641" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
            />
            <path d="M8.75 19.1667V14.1667L12.0833 16.6667L8.75 19.1667Z" fill="#343641" />
            <path 
                d="M5.8335 12.2167V3.33341C5.8335 2.89139 6.00901 2.46747 6.32157 2.15491C6.63413 1.84234 7.05814 1.66675 7.50016 1.66675H12.5002C12.9422 1.66675 13.366 1.84234 13.6785 2.15491C13.9911 2.46747 14.1668 2.89139 14.1668 3.33341V12.2167" 
                stroke="#343641" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
            />
        </svg>
    );
}

export default Turn;