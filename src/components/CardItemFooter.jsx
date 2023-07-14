import React from 'react';
import { DeckOfCards } from '../mobX/store';
import { observer } from 'mobx-react';
import classes from '../pages/pages.module.css';



function CardItemFooter({isNumbersShown, card, cb, index}) {
    return (
        <div className={classes.imgContainer}>
            <div className={classes.index}>{isNumbersShown ? index : null}</div>
            <img 
                src={DeckOfCards.isShown ? `${card.src}${card.id}.jpg` : `${card.src}${card.back}`} 
                onClick={(e) => cb(e, card)} 
                className={classes.cardItem}
            />
        </div>
    );
}

export default observer(CardItemFooter);