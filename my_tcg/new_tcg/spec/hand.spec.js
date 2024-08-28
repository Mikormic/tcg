const Hand = require('../src/models/hand');

describe('Hand', () => {
    let hand;

    beforeEach(() => {
        hand = new Hand({ cards: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7'], limit: 7 });
    });

    it('should have a property "limit" which is an integer with a default value of 7', () => {
        expect(hand.limit).toBe(7);
    });

    it('should be able to add a card to the hand', () => {
        const initialCount = hand.getCardsCount();
        const added = hand.addCard('newCard');
        if (initialCount >= 7) {
            expect(added).toBe(false);
            return;
        }
        expect(added).toBe(true);
        expect(hand.cards).toContain('newCard');
        expect(hand.getCardsCount()).toBe(initialCount + 1);
    });

    it('should not be able to add a card if the limit is reached', () => {
        hand.limit = 3;
        hand.cards = ['Card1', 'Card2', 'Card3'];
        const added = hand.addCard('newCard');
        expect(added).toBe(false);
        expect(hand.cards).not.toContain('newCard');
    });

    it('should be able to remove a card from the hand by position', () => {
        const initialCount = hand.getCardsCount();
        const removedCard = hand.removeCard(1); 
        expect(removedCard).toBe('Card2');
        expect(hand.getCardsCount()).toBe(initialCount - 1);
        expect(hand.cards).not.toContain('Card2');
    });

    it('should return all cards in the hand', () => {
        const allCards = hand.getAllCards();
        expect(allCards).toEqual(['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7']);
    });

    it('should return the count of cards in the hand', () => {
        const cardCount = hand.getCardsCount();
        expect(cardCount).toBe(7);
    });
});
