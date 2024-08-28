const Board = require('../src/models/board');

describe('Board', () => {
    let board;

    beforeEach(() => {
        board = new Board({ cards: ['card1', 'card2', 'card3'], limit: 10 });
    });

    it('should be an instance of Board', () => {
        expect(board instanceof Board).toBe(true);
    });

    it('should have a property "limit" which is an integer with a default value of 7', () => {
        expect(board.limit).toBe(10);
    });

    it('should be able to add a card to the board', () => {
        const initialCount = board.getCardsCount();
        const added = board.addCard('newCard');
        expect(added).toBe(true);
        expect(board.cards).toContain('newCard');
        expect(board.getCardsCount()).toBe(initialCount + 1);
    });

    it('should not be able to add a card if the limit is reached', () => {
        board.limit = 3;
        board.cards = ['card1', 'card2', 'card3'];
        const added = board.addCard('newCard');
        expect(added).toBe(false);
        expect(board.cards).not.toContain('newCard');
    });

    it('should be able to remove a card from the board by position', () => {
        const initialCount = board.getCardsCount();
        const removedCard = board.removeCard(1);
        expect(removedCard).toBe('card2');
        expect(board.getCardsCount()).toBe(initialCount - 1);
        expect(board.cards).not.toContain('card2');
    });

    it('should return all cards in the board', () => {
        const allCards = board.getAllCards();
        expect(allCards).toEqual(['card1', 'card2', 'card3']);
    });

    it('should return the count of cards in the board', () => {
        const cardCount = board.getCardsCount();
        expect(cardCount).toBe(3);
    });
});
