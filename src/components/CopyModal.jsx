import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

function CopyModal(props) {
    const link = `${window.location.protocol}://${window.location.hostname}:${window.location.port}/${props.text}`

    function copy(event) {
        event.preventDefault();
        event.stopPropagation();
        navigator.clipboard.writeText(link)
    }

    return (
        <>
            <Link to={`${props.text}`} >В комнату</Link>
            <button onClick={copy}>скопировать ссылку</button>
        </>
    );
}

export default observer(CopyModal);