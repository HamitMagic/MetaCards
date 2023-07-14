import React, { useState } from 'react';
import classes from '../pages/pages.module.css';
import CardItemFooter from '../components/CardItemFooter';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { DeckOfCards } from '../mobX/store';
import Mybtn from './UI/Mybtn';
import { observer } from 'mobx-react';
import Turn from './UI/svg/Turn';

function CardFooter({toMain}) {
    const [isNumbersShown, setShowNumbers] = useState(true);
    const scrollRef = useHorizontalScroll();

    function mixCards() {
        DeckOfCards.cards.sort(() => Math.random() - 0.5);
    }

    return (
        <footer className={classes.footerCards}>
                <div className={classes.navigateFooter}>
                    <Mybtn cb={mixCards} text='Перемешать карты' />
                    <Mybtn el={Turn} cb={(e) => {
                        e.preventDefault();
                        DeckOfCards.setIsShown();
                    }} text={DeckOfCards.isShown ? 'В закрытую' : 'В открытую'} />
                    <Mybtn cb={(e) => {
                        e.preventDefault();
                        setShowNumbers(!isNumbersShown);
                    }} text={isNumbersShown ? 'Скрыть нумерацию' : "Показать нумерацию"} />
                </div>
                <div className={classes.deckOfCards} ref={scrollRef}>
                    {Array.from(DeckOfCards.cards).map((card, index) => {
                        return (
                            <CardItemFooter 
                                isNumbersShown={isNumbersShown}
                                index={index+1} 
                                key={`${card.src}-${card.id}`} 
                                card={card} 
                                cb={toMain}
                            />
                        )
                    })}
                </div>
            </footer>
    );
}

export default observer(CardFooter);