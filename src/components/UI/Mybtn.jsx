import React from 'react';
import classes from './mybtn.module.css'
import Turn from './svg/Turn';
function Mybtn(props) {
    return (
        <button className={classes.button} onClick={props.cb}>
            {props.el && <Turn />}
            {props.text}
        </button>
    );
}

export default Mybtn;