export class AIAction {
    movePosition;
    minimaxValue = 0;

    constructor(pos) {
        this.movePosition = pos;
    }

    static ASC(fAction, sAction) {
        if (fAction.minimaxValue < sAction.minimaxValue) {
            return -1;
        } else if (fAction.minimaxValue > sAction.minimaxValue) {
            return 1;
        } else {
            return 0;
        }
    }

    static DSC(fAction, sAction) {
        if (fAction.minimaxValue > sAction.minimaxValue) {
            return -1;
        } else if (fAction.minimaxValue < sAction.minimaxValue) {
            return 1;
        } else {
            return 0;
        }
    }
}
