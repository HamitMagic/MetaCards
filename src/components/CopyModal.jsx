import React from 'react';
import { RoomID } from '../mobX/store';
import { CONSTS } from '../assets/consts';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

function CopyModal(props) {

    const link = `${CONSTS.HOST}:${CONSTS.WEB_PORT}/:${props.text}`;

    function copy(event) {
        event.preventDefault();
        event.stopPropagation();
        navigator.clipboard.writeText(link)
    }

    return (
        <>
            {RoomID.room === props.text ? <Link to={`/${props.text}`} >{link}</Link> : null}
            {RoomID.room === props.text ? <button onClick={(e) => copy(e)}>скопировать ссылку</button> : null}
        </>
    );
}

export default observer(CopyModal);