export class OurDate {

    constructor(date) {
        this.date = date;
    }

    isSameDay(anotherDate) {
        return anotherDate._getDay() === this._getDay()
            && anotherDate._getMonth() === this._getMonth();
    }

    _getMonth() {
        return 1 + this.date.getMonth();
    }

    _getDay() {
        return this.date.getDate();
    }
}