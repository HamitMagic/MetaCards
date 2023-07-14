import { observer } from 'mobx-react';
import React from 'react';

function NotFound() {
    return (
        <h1>
            Sorry There is no Such Page
        </h1>
    );
}

export default observer(NotFound);