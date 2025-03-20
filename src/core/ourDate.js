export class OurDate {

    constructor(date) {
        if (!(date instanceof Date)) {
            throw new Error("Invalid date provided");
        }
        this.date = date;
    }

    isSameDay(anotherDate) {
        return anotherDate._getDay() === this._getDay()
            && anotherDate._getMonth() === this._getMonth();
    }

    _getMonth() {
        return this.date.getMonth() + 1;
    }

    _getDay() {
        return this.date.getDate();
    }
}
