const Deck = require('../src/models/deck');

describe('Deck', () => {
    let deck;

    beforeEach(() => {
        deck = new Deck({ cards: ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10'] });
    });

    it('should have a property "cards" which is an array', () => {
        expect(deck.cards).toEqual(jasmine.any(Array));
    });

    it('should shuffle the cards', () => {
        const shuffled = deck.shuffle();
        expect(shuffled).toBe(true);
    });

    it('should insert a card at the specified position or at the end if no position is given', () => {
        const initialCount = deck.getCardsCount();
        deck.insertAt('newCard', 1); 
        expect(deck.cards[1]).toBe('newCard');
        expect(deck.getCardsCount()).toBe(initialCount + 1);

        deck.insertAt('anotherCard'); 
        expect(deck.cards[deck.getCardsCount() - 1]).toBe('anotherCard');
        expect(deck.getCardsCount()).toBe(initialCount + 2);
    });

    it('should draw the first card from the deck', () => {
        const initialCount = deck.getCardsCount();
        const drawnCard = deck.draw();
        expect(drawnCard).toBe('card1');
        expect(deck.getCardsCount()).toBe(initialCount - 1);
    });

    it('should return false when drawing from an empty deck', () => {
        deck.cards = [];
        const drawnCard = deck.draw();
        expect(drawnCard).toBe(false);
    });

    it('should return the count of cards in the deck', () => {
        const cardCount = deck.getCardsCount();
        expect(cardCount).toBe(10);
    });
});
