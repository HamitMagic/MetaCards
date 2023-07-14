import React from 'react';
import classes from '../pages.module.css';
import CopyModal from '../../components/CopyModal';
import SelectDeck from '../../components/SelectDeck';
import { observer } from 'mobx-react';


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
                    {props.id === 'remote' && <CopyModal text={props.text} />}
                    {props.id === 'setDeck' && <SelectDeck data={props.text} />}
                    {props.id === 'settings' && props.text}
                </div>
            </div>
        </div>
    );
}

export default observer(Modal);