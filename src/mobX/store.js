import { makeAutoObservable, configure, makeObservable, action, computed, observable } from "mobx";

configure({enforceActions: 'observed'})

class Room {
    room = '';

    constructor() {
        makeAutoObservable(this);
    }

    setRoom(roomID) {
        this.room = roomID;
    }
}
export const RoomID = new Room();



class Cards {
    // id: img:
    cards = [];
    isShown = false;

    constructor() {
        makeAutoObservable(this)
    }

    setCards(cards) {
        this.cards = cards;
    }

    getCards() {
        return this.cards;
    }

    setIsShown() {
        this.isShown = !this.isShown;
    }

    getIsShown() {
        return this.isShown;
    }

    getCard(id) {
        const card = this.cards.filter((card) => card.id === id);
        return card;
    }
}

export const DeckOfCards = new Cards();