import React, { useState } from 'react';
import { observer } from 'mobx-react';
import classes from '../pages/pages.module.css';
import Turn from './UI/svg/Turn';
import Close from './UI/svg/Close';
import { DeckOfCards, SelectedCards } from '../mobX/store';
import { useResize } from '../hooks/useResize';


function CardItemContainer({card, zInd, setZind, position}) {
    const [left, setLeft] = useState(position);
    const [zIndex, setZindex] = useState(zInd);
    const elementRef = useResize();

    function turn() {
        card.isShown = !card.isShown;
    }

    function deleteFromMain(card) {
        SelectedCards.removeCard(card);
        DeckOfCards.addCard(card);
    }

    return (
        <>
        <div className={classes.deckOfCards} ref={elementRef} style={{left: left, zIndex: zIndex}} onMouseDown={() => {
            setZindex(zInd + 1);
            setZind(zInd + 1);
        }}>
            <Turn cb={turn} />
            <Close cb={deleteFromMain} card={card} />
            <img 
                className={classes.cardItem} 
                src={card.isShown ? `${card.src}${card.id}.jpg` : `${card.src}${card.back}`}
            />

        </div>
        </>
    );
}

export default observer(CardItemContainer);