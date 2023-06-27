import React from 'react';
import { DeckOfCards } from '../mobX/store';
import { observer } from 'mobx-react';
import classes from '../pages/pages.module.css';


function CardItemContainer({link, card, cb}) {
    return (
        <div className={classes.deckOfCards}>
            <img className={classes.cardItem} onClick={(e) => cb(e, card)} src={DeckOfCards.isShown ? `${link}${card.id}.jpg` : `${link}${card.back}`} />
        </div>
    );
}

export default observer(CardItemContainer);