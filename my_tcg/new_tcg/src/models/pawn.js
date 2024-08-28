const EventManager = require('../../src/eventManager');
class Pawn extends EventManager {
    constructor(life, strength, def) {
        super();
        this.life = life;
        this.strength = strength;
        this.def = def;
    }

    getLife() {
        return this.life;
    }

    getStrength() {
        return this.strength;
    }

    getDef() {
        return this.def;
    }

    attack(target) {
        if (target instanceof Pawn) {
            return target.receiveAttack(this, false);
        }
        return false;
    }

    receiveAttack(opponent, strikeBack = false) {
        if (strikeBack) {
            this.life -= opponent.strength - this.getDef();
        } else {
            this.life -= opponent.strength - this.getDef();
            opponent.receiveAttack(this, true);
        }
        return true;
    }
}

module.exports = Pawn;
