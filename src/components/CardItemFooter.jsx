import React from 'react';
import { DeckOfCards } from '../mobX/store';
import { observer } from 'mobx-react';
import classes from '../pages/pages.module.css';



function CardItemFooter({isNumbersShown, card, link, cb, index, className}) {
    return (
        <div >
            <div className={classes.index}>{isNumbersShown ? index : ' '}</div>
            <img 
                src={DeckOfCards.isShown ? `${link}${card.id}.jpg` : `${link}${card.back}`} 
                onClick={(e) => cb(e, card, link)} 
                className={classes.cardItem}
            />
        </div>
    );
}

export default observer(CardItemFooter);