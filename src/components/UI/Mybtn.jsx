import React from 'react';
import classes from './mybtn.module.css'
function Mybtn(props) {
    return (
        <button className={classes.button} onClick={props.cb}>
            {props.text}
        </button>
    );
}

export default Mybtn;