import React from 'react';
import { observer } from 'mobx-react';
import classes from '../pages/pages.module.css';
import Turn from './UI/svg/Turn';
import Close from './UI/svg/Close';
import { DeckOfCards, SelectedCards } from '../mobX/store';


function CardItemContainer({card}) {
    function turn() {
        card.isShown = !card.isShown;
    }

    function deleteFromMain(card) {
        SelectedCards.removeCard(card);
        DeckOfCards.addCard(card);
    }  
    
    return (
        <div className={classes.deckOfCards}>
            <Turn cb={turn} />
            <img 
                className={classes.cardItem} 
                src={card.isShown ? `${card.src}${card.id}.jpg` : `${card.src}${card.back}`}
                width={100}
                height={150}
            />
            <Close cb={deleteFromMain} card={card} />
        </div>
    );
}

export default observer(CardItemContainer);