import React from 'react';
import classes from '../pages.module.css';
import { RoomID } from '../../mobX/store';
import CopyModal from '../../components/CopyModal';
import SelectDeck from '../../components/SelectDeck';


function Modal(props) {

    return (
        <div className={classes.modalBackground} onClick={(e) => props.cb(e, props.id)}>
            <div className={classes.modalActive}>
                <div className={classes.modalClose}>
                    X
                </div>
                <div className={classes.modalWindow}>
                    <h2 className={classes.title}>
                        {props.title}
                    </h2>
                    {RoomID.room === props.text && <CopyModal text={props.text} />}
                    {Array.isArray(props.text) && <SelectDeck data={props.text} />}
                    {typeof(props.text) === 'string' && RoomID.room !== props.text && props.text}
                </div>
            </div>
        </div>
    );
}

export default Modal;