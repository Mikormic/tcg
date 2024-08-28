const Cemetery = require('../src/models/cemetery');

describe('Cemetery', () => {
    let cemetery;

    beforeEach(() => {
        cemetery = new Cemetery({ cards: ['card1', 'card2'] });
    });

    it('should be an instance of Cemetery', () => {
        expect(cemetery instanceof Cemetery).toBe(true);
    });

    it('should be able to shuffle the cards in the cemetery', () => {
        const initialOrder = [...cemetery.cards];
        const shuffled = cemetery.shuffle();
        expect(shuffled).toBe(true);
        expect(cemetery.cards).not.toEqual(initialOrder);
    });

    it('should be able to insert a card into the cemetery', () => {
        const initialCount = cemetery.getCardsCount();
        cemetery.insertAt('newCard');
        expect(cemetery.cards).toContain('newCard');
        expect(cemetery.getCardsCount()).toBe(initialCount + 1);
    });

    it('should be able to draw a card from the cemetery', () => {
        const initialCount = cemetery.getCardsCount();
        const drawnCard = cemetery.draw();
        expect(drawnCard).toBe('card1');
        expect(cemetery.getCardsCount()).toBe(initialCount - 1);
        expect(cemetery.cards).not.toContain('card1');
    });

    it('should return the count of cards in the cemetery', () => {
        const cardCount = cemetery.getCardsCount();
        expect(cardCount).toBe(2);
    });
});
