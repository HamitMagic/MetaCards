import React, { useState } from 'react';
import classes from '../pages.module.css';
import {CONSTS} from '../../assets/consts.js';
import { Link } from 'react-router-dom';
import { RoomID } from '../../mobX/store';
import CopyModal from '../../components/CopyModal';


function RemoteSession(props) {

    

    return (
        <div className={classes.modalBackground} onClick={(e) => props.cb(e, 'remote')}>
            <div className={classes.modalActive}>
                <div className={classes.modalClose}>
                    X
                </div>
                <div className={classes.modalWindow}>
                    <h2>
                        {props.title}
                    </h2>
                    {RoomID.room === props.text ? <CopyModal text={props.text} /> : null}
                </div>
            </div>
        </div>
    );
}

export default RemoteSession;